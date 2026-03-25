import { randomUUID } from "node:crypto";
import { createServer } from "node:http";
import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

loadEnvFiles([".env.local", ".env"]);

const port = Number(process.env.PORT || 8787);
const allowedOrigins = parseList(process.env.ALLOWED_ORIGINS);
const hasExplicitAllowedOrigins = allowedOrigins.length > 0;
const contactStorageFile = resolve(
  process.cwd(),
  process.env.CONTACT_STORAGE_FILE || "server/data/contact-submissions.ndjson",
);

class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
  }
}

function loadEnvFiles(fileNames) {
  for (const fileName of fileNames) {
    const filePath = resolve(process.cwd(), fileName);

    if (!existsSync(filePath)) {
      continue;
    }

    const contents = readFileSync(filePath, "utf8");

    for (const rawLine of contents.split(/\r?\n/)) {
      const line = rawLine.trim();

      if (!line || line.startsWith("#")) {
        continue;
      }

      const separatorIndex = line.indexOf("=");

      if (separatorIndex === -1) {
        continue;
      }

      const key = line.slice(0, separatorIndex).trim();
      let value = line.slice(separatorIndex + 1).trim();

      if (!key || process.env[key] !== undefined) {
        continue;
      }

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      process.env[key] = value;
    }
  }
}

function parseList(value) {
  return (value || "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function isLoopbackOrigin(origin) {
  try {
    const { hostname } = new URL(origin);
    return hostname === "localhost" || hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

function isOriginAllowed(origin) {
  if (!origin) {
    return true;
  }

  return (
    allowedOrigins.includes("*") ||
    allowedOrigins.includes(origin) ||
    (!hasExplicitAllowedOrigins && isLoopbackOrigin(origin))
  );
}

function applyCorsHeaders(response, origin) {
  const resolvedOrigin = !origin
    ? allowedOrigins[0] || "*"
    : allowedOrigins.includes("*")
      ? "*"
      : origin;

  response.setHeader("Access-Control-Allow-Origin", resolvedOrigin);
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function sendJson(response, statusCode, payload, origin) {
  applyCorsHeaders(response, origin);
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(payload));
}

async function readJsonBody(request) {
  let rawBody = "";

  for await (const chunk of request) {
    rawBody += chunk;

    if (rawBody.length > 1_000_000) {
      throw new HttpError(413, "Request body is too large.");
    }
  }

  if (!rawBody) {
    return {};
  }

  try {
    return JSON.parse(rawBody);
  } catch {
    throw new HttpError(400, "Request body must be valid JSON.");
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function validatePayload(payload) {
  const normalizedPayload = {
    name: String(payload.name || "").trim(),
    email: String(payload.email || "").trim(),
    phone: String(payload.phone || "").trim(),
    service: String(payload.service || "").trim(),
    message: String(payload.message || "").trim(),
  };
  const errors = [];

  if (!normalizedPayload.name) {
    errors.push("Name is required.");
  }

  if (!normalizedPayload.email) {
    errors.push("Email is required.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedPayload.email)) {
    errors.push("Email address is invalid.");
  }

  if (!normalizedPayload.service) {
    errors.push("Service is required.");
  }

  if (!normalizedPayload.message) {
    errors.push("Message is required.");
  }

  return {
    errors,
    payload: normalizedPayload,
  };
}

function buildEmailContent(payload) {
  const subjectPrefix = process.env.CONTACT_SUBJECT_PREFIX || "[Dynamic Windows]";
  const subject = `${subjectPrefix} ${payload.service} inquiry from ${payload.name}`;

  const rows = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Phone", payload.phone || "Not provided"],
    ["Service", payload.service],
    ["Message", payload.message],
  ];

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 14px;border:1px solid #dbeafe;font-weight:600;background:#eff6ff;">${escapeHtml(label)}</td><td style="padding:10px 14px;border:1px solid #dbeafe;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;background:#020617;padding:32px;color:#e2e8f0;">
      <div style="max-width:680px;margin:0 auto;background:#0f172a;border:1px solid rgba(148,163,184,0.18);border-radius:20px;overflow:hidden;">
        <div style="padding:24px 28px;background:linear-gradient(135deg,#0891b2,#2563eb);color:white;">
          <h1 style="margin:0;font-size:24px;">New Contact Inquiry</h1>
          <p style="margin:8px 0 0;font-size:14px;opacity:0.92;">Dynamic Windows website lead</p>
        </div>
        <div style="padding:24px 28px;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">${htmlRows}</table>
        </div>
      </div>
    </div>
  `;

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  return {
    subject,
    html,
    text,
  };
}

async function sendViaResend(payload) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    throw new HttpError(
      503,
      "Email backend is not configured. Set RESEND_API_KEY, CONTACT_FROM_EMAIL, and CONTACT_TO_EMAIL.",
    );
  }

  const emailContent = buildEmailContent(payload);
  let response;

  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: payload.email,
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
      }),
    });
  } catch {
    throw new HttpError(502, "Failed to reach the email provider.");
  }

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new HttpError(502, result.message || "Resend failed to deliver the email.");
  }

  return {
    deliveryMode: "resend",
    id: result.id || null,
  };
}

function isResendConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL && process.env.CONTACT_TO_EMAIL,
  );
}

function getRequestedDeliveryMode() {
  const requestedMode = (process.env.CONTACT_DELIVERY_MODE || "auto").trim().toLowerCase();

  return ["auto", "local", "resend"].includes(requestedMode) ? requestedMode : "auto";
}

function getResolvedDeliveryMode() {
  const requestedMode = getRequestedDeliveryMode();

  if (requestedMode === "resend") {
    if (!isResendConfigured()) {
      throw new HttpError(
        503,
        "Email backend is not configured. Set RESEND_API_KEY, CONTACT_FROM_EMAIL, and CONTACT_TO_EMAIL.",
      );
    }

    return "resend";
  }

  if (requestedMode === "local") {
    return "local";
  }

  return isResendConfigured() ? "resend" : "local";
}

function archiveSubmission(payload) {
  const submissionId = `local_${randomUUID()}`;
  const entry = {
    id: submissionId,
    receivedAt: new Date().toISOString(),
    payload,
  };

  mkdirSync(dirname(contactStorageFile), { recursive: true });
  appendFileSync(contactStorageFile, `${JSON.stringify(entry)}\n`, "utf8");

  console.log(`Archived contact submission ${submissionId} to ${contactStorageFile}`);

  return {
    deliveryMode: "local",
    id: submissionId,
  };
}

async function deliverContactMessage(payload) {
  return getResolvedDeliveryMode() === "local" ? archiveSubmission(payload) : sendViaResend(payload);
}

function getHealthPayload() {
  const requestedMode = getRequestedDeliveryMode();
  const resendConfigured = isResendConfigured();
  const deliveryMode =
    requestedMode === "auto" ? (resendConfigured ? "resend" : "local") : requestedMode;

  return {
    status: "ok",
    deliveryMode,
    resendConfigured,
    archiveEnabled: deliveryMode === "local",
  };
}

function getErrorStatusCode(error) {
  return error instanceof HttpError ? error.statusCode : 500;
}

const server = createServer(async (request, response) => {
  const origin = request.headers.origin;

  if (!isOriginAllowed(origin)) {
    sendJson(response, 403, { message: "Origin is not allowed." }, origin);
    return;
  }

  if (request.method === "OPTIONS") {
    applyCorsHeaders(response, origin);
    response.writeHead(204);
    response.end();
    return;
  }

  const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);

  if (request.method === "GET" && url.pathname === "/api/health") {
    sendJson(response, 200, getHealthPayload(), origin);
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/contact") {
    try {
      const payload = await readJsonBody(request);
      const { errors, payload: normalizedPayload } = validatePayload(payload);

      if (errors.length > 0) {
        sendJson(response, 422, { message: errors[0], errors }, origin);
        return;
      }

      const result = await deliverContactMessage(normalizedPayload);

      sendJson(
        response,
        200,
        {
          message:
            result.deliveryMode === "local"
              ? "Message saved locally."
              : "Message sent successfully.",
          id: result.id || null,
          deliveryMode: result.deliveryMode,
        },
        origin,
      );
    } catch (error) {
      sendJson(
        response,
        getErrorStatusCode(error),
        {
          message:
            error instanceof Error
              ? error.message
              : "Unexpected error while sending the message.",
        },
        origin,
      );
    }
    return;
  }

  sendJson(response, 404, { message: "Route not found." }, origin);
});

server.listen(port, () => {
  console.log(
    `Contact API listening on http://127.0.0.1:${port} (delivery: ${getHealthPayload().deliveryMode})`,
  );
});
