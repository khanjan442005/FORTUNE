import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

loadEnvFiles([".env.local", ".env"]);

const mode = process.argv[2] === "preview" ? "preview" : "dev";
const childProcesses = [];
let shuttingDown = false;

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

function getContactServerBaseUrl() {
  if (process.env.CONTACT_SERVER_URL) {
    return process.env.CONTACT_SERVER_URL.replace(/\/$/, "");
  }

  const port = process.env.PORT || "8787";
  return `http://127.0.0.1:${port}`;
}

async function canReuseExistingContactServer() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 1200);

  try {
    const response = await fetch(`${getContactServerBaseUrl()}/api/health`, {
      signal: controller.signal,
    });

    if (!response.ok) {
      return false;
    }

    const payload = await response.json().catch(() => ({}));
    return payload?.status === "ok";
  } catch {
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
}

function shutdown(exitCode = 0) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  for (const child of childProcesses) {
    if (!child.killed) {
      child.kill("SIGTERM");
    }
  }

  setTimeout(() => process.exit(exitCode), 150);
}

function startTask(name, command) {
  const child = spawn(command, {
    stdio: "inherit",
    env: process.env,
    shell: true,
  });

  child.on("exit", (code) => {
    if (shuttingDown) {
      return;
    }

    const normalizedCode = typeof code === "number" ? code : 0;

    if (normalizedCode !== 0) {
      console.error(`${name} exited with code ${normalizedCode}`);
    }

    shutdown(normalizedCode);
  });

  child.on("error", (error) => {
    console.error(`Failed to start ${name}:`, error);
    shutdown(1);
  });

  childProcesses.push(child);
}

async function main() {
  const shouldReuseServer = await canReuseExistingContactServer();
  const tasks =
    mode === "preview"
      ? [
          shouldReuseServer ? null : ["server", "npm run server"],
          ["client", "npm run preview:client"],
        ]
      : [
          shouldReuseServer ? null : ["server", "npm run dev:server"],
          ["client", "npm run dev:client"],
        ];

  if (shouldReuseServer) {
    console.log(`Reusing existing contact server at ${getContactServerBaseUrl()}`);
  }

  for (const task of tasks) {
    if (!task) {
      continue;
    }

    const [name, command] = task;
    startTask(name, command);
  }
}

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => shutdown(0));
}

main().catch((error) => {
  console.error("Failed to start local stack:", error);
  shutdown(1);
});
