import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDebounce, useLocalStorage } from "../hooks/useInView";
import { RevealOnScroll, StaggerReveal } from "./RevealOnScroll";

const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL || "/api/contact";
const CONTACT_DRAFT_KEY = "fortune.contact-form.draft";
const CONTACT_DRAFT_DELAY = 250;
const MAX_MESSAGE_LENGTH = 900;
const MIN_MESSAGE_LENGTH = 20;

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

const fieldOrder = ["name", "email", "phone", "service", "message"];

const serviceOptions = [
  "Window Installation",
  "Repair",
  "Glass Upgrade",
  "Custom Design",
  "Consultation",
];

const serviceMatchers = [
  {
    service: "Repair",
    keywords: [
      { term: "repair", weight: 7 },
      { term: "repairs", weight: 7 },
      { term: "fix", weight: 6 },
      { term: "broken", weight: 7 },
      { term: "damage", weight: 5 },
      { term: "damaged", weight: 5 },
      { term: "leak", weight: 6 },
      { term: "maintenance", weight: 4 },
      { term: "crack", weight: 6 },
      { term: "cracked", weight: 6 },
    ],
  },
  {
    service: "Glass Upgrade",
    keywords: [
      { term: "glass", weight: 4 },
      { term: "glazing", weight: 6 },
      { term: "double glazing", weight: 8 },
      { term: "triple glazing", weight: 8 },
      { term: "low e", weight: 7 },
      { term: "insulation", weight: 5 },
      { term: "thermal", weight: 5 },
      { term: "soundproof", weight: 6 },
      { term: "upgrade", weight: 3 },
    ],
  },
  {
    service: "Window Installation",
    keywords: [
      { term: "window installation", weight: 9 },
      { term: "install", weight: 6 },
      { term: "installation", weight: 6 },
      { term: "new window", weight: 7 },
      { term: "replacement", weight: 6 },
      { term: "replace", weight: 5 },
      { term: "renovation", weight: 4 },
      { term: "renovate", weight: 4 },
      { term: "windows", weight: 3 },
      { term: "window", weight: 3 },
    ],
  },
  {
    service: "Custom Design",
    keywords: [
      { term: "custom", weight: 7 },
      { term: "design", weight: 6 },
      { term: "style", weight: 5 },
      { term: "color", weight: 5 },
      { term: "colour", weight: 5 },
      { term: "finish", weight: 5 },
      { term: "bespoke", weight: 7 },
      { term: "look", weight: 3 },
    ],
  },
  {
    service: "Consultation",
    keywords: [
      { term: "consultation", weight: 8 },
      { term: "consult", weight: 6 },
      { term: "quote", weight: 6 },
      { term: "pricing", weight: 5 },
      { term: "estimate", weight: 6 },
      { term: "advice", weight: 5 },
      { term: "inspection", weight: 5 },
      { term: "visit", weight: 3 },
    ],
  },
];

const formFields = [
  {
    id: "name",
    label: "Full Name",
    type: "text",
    placeholder: "John Doe",
    autoComplete: "name",
    required: true,
    badge: "NM",
    helper: "Use the name we should address in the reply.",
  },
  {
    id: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "+91 98765 43210",
    autoComplete: "tel",
    required: false,
    badge: "PH",
    helper: "Optional, but useful if you want a callback.",
  },
  {
    id: "email",
    label: "Email Address",
    type: "email",
    placeholder: "john@example.com",
    autoComplete: "email",
    required: true,
    badge: "EM",
    helper: "We will send the response to this email.",
  },
];

const contactCards = [
  {
    title: "Visit Us",
    desc: "123 Business Park, Suite 100",
    subdesc: "Ahmedabad, Gujarat 380001",
    href: "https://maps.google.com/?q=123 Business Park, Suite 100, Ahmedabad Gujarat 380001",
    badge: "MAP",
  },
  {
    title: "Call Us",
    desc: "+91 98765 43210",
    subdesc: "Mon - Sat: 9AM - 7PM",
    href: "tel:+919876543210",
    badge: "CALL",
  },
  {
    title: "Email Us",
    desc: "info@fortune.com",
    subdesc: "Replies within 24 hours",
    href: "mailto:info@fortune.com",
    badge: "MAIL",
  },
];

const formHighlights = [
  {
    title: "Smarter service suggestion",
    desc: "The form scores your message against service keywords instead of taking the first match only.",
  },
  {
    title: "Drafts are preserved",
    desc: "If you leave the page mid-way, your enquiry stays saved locally on this browser.",
  },
  {
    title: "Live delivery feedback",
    desc: "The form checks whether the backend is sending real email or saving submissions locally.",
  },
];

function createTouchedState() {
  return {
    name: false,
    email: false,
    phone: false,
    service: false,
    message: false,
  };
}

function normalizeText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function normalizeMessage(value) {
  return String(value || "").replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

function sanitizeFieldValue(field, value) {
  if (field === "phone") {
    return String(value || "")
      .replace(/[^\d+()\-\s]/g, "")
      .replace(/\s{2,}/g, " ")
      .slice(0, 24);
  }

  if (field === "message") {
    return String(value || "").slice(0, MAX_MESSAGE_LENGTH);
  }

  return value;
}

function normalizeFormData(formData) {
  return {
    name: normalizeText(formData.name),
    email: normalizeText(formData.email).toLowerCase(),
    phone: normalizeText(formData.phone),
    service: normalizeText(formData.service),
    message: normalizeMessage(formData.message),
  };
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function countKeywordMatches(message, term) {
  if (!message || !term) {
    return 0;
  }

  const normalizedTerm = term.toLowerCase();

  if (normalizedTerm.includes(" ")) {
    let count = 0;
    let searchIndex = 0;

    while (true) {
      const foundAt = message.indexOf(normalizedTerm, searchIndex);

      if (foundAt === -1) {
        return count;
      }

      count += 1;
      searchIndex = foundAt + normalizedTerm.length;
    }
  }

  const regex = new RegExp(`\\b${escapeRegExp(normalizedTerm)}\\b`, "g");
  return [...message.matchAll(regex)].length;
}

function analyzeService(message) {
  const normalized = normalizeMessage(message)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalized) {
    return { service: "", confidence: "none", matchedTerms: [], score: 0 };
  }

  const rankedMatches = serviceMatchers
    .map((matcher) => {
      const matchedTerms = matcher.keywords
        .map((keyword) => {
          const count = countKeywordMatches(normalized, keyword.term);

          if (!count) {
            return null;
          }

          return {
            term: keyword.term,
            count,
            score: keyword.weight * count,
          };
        })
        .filter(Boolean);

      const totalScore = matchedTerms.reduce((score, item) => score + item.score, 0);
      const totalHits = matchedTerms.reduce((hits, item) => hits + item.count, 0);

      return {
        service: matcher.service,
        matchedTerms,
        totalScore,
        totalHits,
      };
    })
    .filter((item) => item.totalScore > 0)
    .sort((left, right) => {
      if (right.totalScore !== left.totalScore) {
        return right.totalScore - left.totalScore;
      }

      return right.totalHits - left.totalHits;
    });

  if (rankedMatches.length === 0) {
    return { service: "", confidence: "none", matchedTerms: [], score: 0 };
  }

  const topMatch = rankedMatches[0];
  const runnerUpScore = rankedMatches[1]?.totalScore || 0;
  const scoreGap = topMatch.totalScore - runnerUpScore;
  let confidence = "low";

  if (topMatch.totalScore >= 8 && scoreGap >= 3) {
    confidence = "high";
  } else if (topMatch.totalScore >= 5 && scoreGap >= 2) {
    confidence = "medium";
  }

  return {
    service: topMatch.service,
    confidence,
    matchedTerms: topMatch.matchedTerms.slice(0, 3).map((item) => item.term),
    score: topMatch.totalScore,
  };
}

function validateField(field, formData) {
  const normalized = normalizeFormData(formData);

  if (field === "name") {
    if (!normalized.name) {
      return "Name is required.";
    }

    if (normalized.name.length < 2) {
      return "Name should be at least 2 characters.";
    }

    if (/\d/.test(normalized.name)) {
      return "Name should not contain numbers.";
    }

    return "";
  }

  if (field === "email") {
    if (!normalized.email) {
      return "Email is required.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.email)) {
      return "Enter a valid email address.";
    }

    return "";
  }

  if (field === "phone") {
    if (!normalized.phone) {
      return "";
    }

    const digits = normalized.phone.replace(/\D/g, "");

    if (digits.length < 7 || digits.length > 15) {
      return "Phone number should have 7 to 15 digits.";
    }

    return "";
  }

  if (field === "service") {
    if (!normalized.service) {
      return "Select a service.";
    }

    if (!serviceOptions.includes(normalized.service)) {
      return "Choose one of the listed services.";
    }

    return "";
  }

  if (field === "message") {
    if (!normalized.message) {
      return "Message is required.";
    }

    if (normalized.message.length < MIN_MESSAGE_LENGTH) {
      return `Message should be at least ${MIN_MESSAGE_LENGTH} characters.`;
    }

    return "";
  }

  return "";
}

function validateFormData(formData) {
  return fieldOrder.reduce((errors, field) => {
    errors[field] = validateField(field, formData);
    return errors;
  }, {});
}

function getFirstError(errors) {
  return fieldOrder.map((field) => errors[field]).find(Boolean) || "";
}

function isFormEmpty(formData) {
  return Object.values(normalizeFormData(formData)).every((value) => !value);
}

function getHealthEndpoint() {
  if (typeof window === "undefined") {
    return "/api/health";
  }

  try {
    const url = new URL(CONTACT_API_URL, window.location.origin);
    url.pathname = url.pathname.replace(/\/contact\/?$/, "/health");
    url.search = "";
    return url.toString();
  } catch {
    return "/api/health";
  }
}

function createEmptyDraftState() {
  return {
    formData: { ...emptyForm },
    serviceSelectionMode: "auto",
  };
}

function normalizeDraftState(draft) {
  const restoredFormData = normalizeFormData({
    ...emptyForm,
    ...draft?.formData,
  });

  return {
    formData: restoredFormData,
    serviceSelectionMode:
      draft?.serviceSelectionMode === "manual" && restoredFormData.service ? "manual" : "auto",
  };
}

function parseContactDraft(value) {
  return normalizeDraftState(JSON.parse(value));
}

function serializeContactDraft(value) {
  return JSON.stringify(normalizeDraftState(value));
}

function Contact() {
  const [storedDraft, setStoredDraft, removeStoredDraft] = useLocalStorage(
    CONTACT_DRAFT_KEY,
    createEmptyDraftState,
    {
      deserializer: parseContactDraft,
      serializer: serializeContactDraft,
      syncTabs: false,
    },
  );
  const initialDraftRef = useRef(storedDraft);
  const initialDraft = initialDraftRef.current;
  const [formData, setFormData] = useState(initialDraft.formData);
  const [focusedField, setFocusedField] = useState(null);
  const [touchedFields, setTouchedFields] = useState(createTouchedState);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState({ type: "idle", message: "" });
  const [serviceSelectionMode, setServiceSelectionMode] = useState(initialDraft.serviceSelectionMode);
  const [backendStatus, setBackendStatus] = useState({
    status: "checking",
    deliveryMode: "",
  });
  const [hasRestoredDraft, setHasRestoredDraft] = useState(() => !isFormEmpty(initialDraft.formData));

  const deferredMessage = useDeferredValue(formData.message);
  const serviceAnalysis = useMemo(() => analyzeService(deferredMessage), [deferredMessage]);
  const draftPayload = useMemo(
    () => ({
      formData: normalizeFormData(formData),
      serviceSelectionMode,
    }),
    [formData, serviceSelectionMode],
  );
  const debouncedDraft = useDebounce(draftPayload, CONTACT_DRAFT_DELAY);
  const detectedService =
    serviceAnalysis.confidence === "high" || serviceAnalysis.confidence === "medium"
      ? serviceAnalysis.service
      : "";
  const validationErrors = useMemo(() => validateFormData(formData), [formData]);
  const requiredFieldsReady = useMemo(() => {
    const requiredFields = ["name", "email", "service", "message"];
    return requiredFields.filter((field) => !validationErrors[field]).length;
  }, [validationErrors]);
  const messageLength = formData.message.length;
  const suggestionDiffers = Boolean(
    serviceAnalysis.service && serviceAnalysis.service !== normalizeText(formData.service),
  );
  const backendStatusLabel =
    backendStatus.status === "checking"
      ? "Checking contact server"
      : backendStatus.status === "offline"
        ? "Server currently unreachable"
        : backendStatus.deliveryMode === "resend"
          ? "Live email delivery active"
          : "Local inbox mode active";
  const backendStatusClassName =
    backendStatus.status === "checking"
      ? "border-white/10 bg-white/5 text-slate-300"
      : backendStatus.status === "offline"
        ? "border-rose-400/20 bg-rose-400/10 text-rose-200"
        : backendStatus.deliveryMode === "resend"
          ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
          : "border-blue-400/20 bg-blue-400/10 text-blue-200";

  useEffect(() => {
    if (serviceSelectionMode === "manual") {
      return;
    }

    setFormData((previous) => {
      const nextService = detectedService || "";

      if (previous.service === nextService) {
        return previous;
      }

      return {
        ...previous,
        service: nextService,
      };
    });
  }, [detectedService, serviceSelectionMode]);

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();

    const checkBackend = async () => {
      try {
        const response = await fetch(getHealthEndpoint(), {
          signal: controller.signal,
        });
        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(payload.message || "Health check failed.");
        }

        if (!isActive) {
          return;
        }

        setBackendStatus({
          status: "online",
          deliveryMode: String(payload.deliveryMode || ""),
        });
      } catch {
        if (!isActive || controller.signal.aborted) {
          return;
        }

        setBackendStatus({
          status: "offline",
          deliveryMode: "",
        });
      }
    };

    checkBackend();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (isFormEmpty(formData)) {
      removeStoredDraft();
      return;
    }

    if (isFormEmpty(debouncedDraft.formData)) {
      return;
    }

    setStoredDraft(debouncedDraft);
  }, [debouncedDraft, formData, removeStoredDraft, setStoredDraft]);

  const clearTransientState = () => {
    if (submitState.type !== "idle") {
      setSubmitState({ type: "idle", message: "" });
    }

    if (hasRestoredDraft) {
      setHasRestoredDraft(false);
    }
  };

  const handleFocus = (field) => () => {
    setFocusedField(field);
  };

  const handleBlur = (field) => () => {
    setFocusedField(null);
    setTouchedFields((previous) => ({
      ...previous,
      [field]: true,
    }));
  };

  const handleChange = (field) => (event) => {
    const value = sanitizeFieldValue(field, event.target.value);

    clearTransientState();
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleServiceChange = (event) => {
    const { value } = event.target;

    clearTransientState();
    setServiceSelectionMode(value ? "manual" : "auto");
    setFormData((previous) => ({
      ...previous,
      service: value,
    }));
  };

  const applySuggestedService = () => {
    if (!serviceAnalysis.service) {
      return;
    }

    clearTransientState();
    setServiceSelectionMode("manual");
    setTouchedFields((previous) => ({
      ...previous,
      service: true,
    }));
    setFormData((previous) => ({
      ...previous,
      service: serviceAnalysis.service,
    }));
  };

  const clearForm = () => {
    removeStoredDraft();
    setFormData(emptyForm);
    setFocusedField(null);
    setTouchedFields(createTouchedState());
    setHasAttemptedSubmit(false);
    setHasRestoredDraft(false);
    setServiceSelectionMode("auto");
    setSubmitState({ type: "idle", message: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const normalizedPayload = normalizeFormData(formData);
    const nextErrors = validateFormData(normalizedPayload);
    const firstError = getFirstError(nextErrors);

    setHasAttemptedSubmit(true);
    setTouchedFields({
      name: true,
      email: true,
      phone: true,
      service: true,
      message: true,
    });
    setFormData(normalizedPayload);

    if (firstError) {
      setSubmitState({
        type: "error",
        message: firstError,
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitState({ type: "idle", message: "" });

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(normalizedPayload),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.message || "Unable to send your message right now.");
      }

      setSubmitState({
        type: "success",
        message:
          payload.deliveryMode === "local"
            ? "Message saved locally. Add the email environment variables to enable live delivery."
            : "Message sent successfully. Our team will contact you shortly.",
      });
      removeStoredDraft();
      setFormData(emptyForm);
      setFocusedField(null);
      setTouchedFields(createTouchedState());
      setHasAttemptedSubmit(false);
      setHasRestoredDraft(false);
      setServiceSelectionMode("auto");
      setBackendStatus((previous) => ({
        ...previous,
        status: "online",
        deliveryMode: String(payload.deliveryMode || previous.deliveryMode || ""),
      }));
    } catch (error) {
      const message =
        error instanceof TypeError
          ? "Contact server is not reachable. Start `npm run dev` or `npm run dev:server` and try again."
          : error instanceof Error
            ? error.message
            : "Something went wrong while sending your message.";

      setSubmitState({
        type: "error",
        message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getVisibleError = (field) => {
    if (!touchedFields[field] && !hasAttemptedSubmit) {
      return "";
    }

    return validationErrors[field];
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-br from-[#020617] via-[#07111f] to-[#030712] py-20 md:py-24"
    >
      <div className="hex-pattern absolute inset-0 opacity-25"></div>
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl md:h-[420px] md:w-[420px]"></div>
      <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-blue-500/15 blur-3xl md:h-[360px] md:w-[360px]"></div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass mb-4 inline-block rounded-full px-4 py-2 text-sm font-medium text-blue-400"
          >
            Contact Us
          </motion.span>
          <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Let&apos;s Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-slate-400 md:text-lg">
            Ready to transform your home or workspace? Share your requirement and we will
            send the right recommendation and quote.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8"
          >
            <div className="glass-strong rounded-[2rem] border border-white/10 p-6 md:p-8">
              <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-blue-300/80">
                    Contact Information
                  </p>
                  <h3 className="mt-3 max-w-xl text-3xl font-bold text-white">
                    Start your next window project with a team that replies fast.
                  </h3>
                </div>
                <div className="rounded-2xl border border-blue-400/20 bg-blue-400/10 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-blue-200 md:min-w-[140px] md:text-right">
                  Response Time
                  <div className="mt-1 text-lg tracking-normal text-white">Within 24 hrs</div>
                </div>
              </div>

              <div className="space-y-5">
                {contactCards.map((item, index) => (
                  <motion.a
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ x: 10, scale: 1.01 }}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-slate-950/35 p-4 transition-colors hover:border-blue-400/30 hover:bg-slate-900/60 hover-lift sm:items-center sm:gap-5 sm:p-5"
                  >
                    <motion.div
                      className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/80 to-indigo-500/80 text-[11px] font-bold tracking-[0.2em] text-white shadow-lg shadow-blue-900/40 transition-transform group-hover:scale-110"
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.badge}
                    </motion.div>
                    <div>
                      <p className="font-semibold text-blue-300">{item.title}</p>
                      <p className="mt-1 text-white">{item.desc}</p>
                      <p className="mt-1 text-sm text-slate-400">{item.subdesc}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-3xl border border-white/10 p-5 md:p-6"
              >
                <h4 className="text-xl font-bold text-white">Business Hours</h4>
                <div className="mt-5 space-y-3 text-sm text-slate-300">
                  <div className="flex items-center justify-between gap-4">
                    <span>Monday - Saturday</span>
                    <span className="text-blue-300">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>Sunday</span>
                    <span className="text-rose-300">Closed</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass rounded-3xl border border-white/10 p-5 md:p-6"
              >
                <h4 className="text-xl font-bold text-white">Why This Form Works</h4>
                <div className="mt-5 space-y-3 text-sm text-slate-400">
                  {formHighlights.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-white/8 bg-slate-950/35 p-4"
                    >
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-strong relative overflow-hidden rounded-[2rem] border border-white/10 p-6 md:p-10"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-400 to-amber-400"></div>

              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.26em] text-blue-300/80">
                    Enquiry Form
                  </p>
                  <h3 className="mt-3 text-3xl font-bold text-white">Tell us what you need.</h3>
                  <p className="mt-3 max-w-xl text-sm text-slate-400">
                    Your message helps us suggest the best service, but you can still choose a
                    different option manually.
                  </p>
                </div>

                {!isFormEmpty(formData) && (
                  <button
                    type="button"
                    onClick={clearForm}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-blue-400/30 hover:text-white"
                  >
                    Clear form
                  </button>
                )}
              </div>

              <div className="mb-8 flex flex-wrap gap-3">
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300">
                  {requiredFieldsReady}/4 required details ready
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300">
                  {messageLength}/{MAX_MESSAGE_LENGTH} chars
                </div>
                <div
                  className={`rounded-full border px-4 py-2 text-xs font-medium ${backendStatusClassName}`}
                >
                  {backendStatusLabel}
                </div>
                {!isFormEmpty(formData) && (
                  <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300">
                    Draft saved automatically
                  </div>
                )}
              </div>

              {hasRestoredDraft && (
                <div className="mb-6 rounded-2xl border border-blue-400/20 bg-blue-400/10 px-4 py-3 text-sm text-blue-100">
                  Restored your last saved enquiry draft.
                </div>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                {formFields.map((field, index) => {
                  const fieldError = getVisibleError(field.id);

                  return (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                    >
                      <label className="mb-3 flex items-center gap-3 text-sm font-semibold text-blue-300">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-400/10 text-[11px] tracking-[0.16em] text-blue-200">
                          {field.badge}
                        </span>
                        {field.label}
                      </label>
                      <div className="relative">
                        <div
                          className={`pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 transition-opacity duration-300 ${
                            focusedField === field.id ? "opacity-100" : "opacity-0"
                          }`}
                        ></div>
                        <input
                          type={field.type}
                          value={formData[field.id]}
                          onChange={handleChange(field.id)}
                          onFocus={handleFocus(field.id)}
                          onBlur={handleBlur(field.id)}
                          placeholder={field.placeholder}
                          autoComplete={field.autoComplete}
                          aria-invalid={Boolean(fieldError)}
                          aria-describedby={`${field.id}-hint`}
                          className={`input-glow relative z-10 bg-slate-950/45 ${
                            focusedField === field.id ? "border-blue-500" : ""
                          } ${fieldError ? "border-rose-400/60" : ""}`}
                          required={field.required}
                        />
                      </div>
                      <p
                        id={`${field.id}-hint`}
                        className={`mt-2 text-sm ${
                          fieldError ? "text-rose-300" : "text-slate-500"
                        }`}
                      >
                        {fieldError || field.helper}
                      </p>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.24 }}
                >
                  <label className="mb-3 flex items-center gap-3 text-sm font-semibold text-blue-300">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-400/10 text-[11px] tracking-[0.16em] text-blue-200">
                      SR
                    </span>
                    Service Interested In
                  </label>
                  <div className="relative">
                    <div
                      className={`pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 transition-opacity duration-300 ${
                        focusedField === "service" ? "opacity-100" : "opacity-0"
                      }`}
                    ></div>
                    <select
                      value={formData.service}
                      onChange={handleServiceChange}
                      onFocus={handleFocus("service")}
                      onBlur={handleBlur("service")}
                      aria-invalid={Boolean(getVisibleError("service"))}
                      aria-describedby="service-hint"
                      className={`input-glow relative z-10 appearance-none bg-slate-950/45 pr-12 ${
                        focusedField === "service" ? "border-blue-500" : ""
                      } ${getVisibleError("service") ? "border-rose-400/60" : ""}`}
                      required
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((service) => (
                        <option key={service} value={service} className="bg-slate-900">
                          {service}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="pointer-events-none absolute right-4 top-1/2 z-20 h-5 w-5 -translate-y-1/2 text-slate-400"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div id="service-hint" className="mt-2 space-y-2 text-sm">
                    {getVisibleError("service") ? (
                      <p className="text-rose-300">{getVisibleError("service")}</p>
                    ) : serviceAnalysis.service ? (
                      <div className="flex flex-wrap items-center gap-2 text-slate-400">
                        <span
                          className={
                            serviceSelectionMode === "manual"
                              ? "text-slate-400"
                              : "text-blue-300"
                          }
                        >
                          {serviceSelectionMode === "manual"
                            ? `Suggested: ${serviceAnalysis.service}`
                            : `Auto-selected: ${serviceAnalysis.service}`}
                        </span>
                        <span className="text-slate-500">
                          from {serviceAnalysis.matchedTerms.join(", ")}
                        </span>
                        {suggestionDiffers && (
                          <button
                            type="button"
                            onClick={applySuggestedService}
                            className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-200 transition-colors hover:border-blue-300/40 hover:text-white"
                          >
                            Use suggestion
                          </button>
                        )}
                      </div>
                    ) : (
                      <p className="text-slate-500">
                        Describe the project and the form will try to suggest a service.
                      </p>
                    )}
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-6"
              >
                <label className="mb-3 flex items-center gap-3 text-sm font-semibold text-blue-300">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-400/10 text-[11px] tracking-[0.16em] text-blue-200">
                    MSG
                  </span>
                  Message
                </label>
                <div className="relative">
                  <div
                    className={`pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 transition-opacity duration-300 ${
                      focusedField === "message" ? "opacity-100" : "opacity-0"
                    }`}
                  ></div>
                  <textarea
                    value={formData.message}
                    onChange={handleChange("message")}
                    onFocus={handleFocus("message")}
                    onBlur={handleBlur("message")}
                    placeholder="Tell us about your project, issue, or upgrade plan..."
                    rows={5}
                    aria-invalid={Boolean(getVisibleError("message"))}
                    aria-describedby="message-hint"
                    className={`input-glow relative z-10 resize-none bg-slate-950/45 ${
                      focusedField === "message" ? "border-blue-500" : ""
                    } ${getVisibleError("message") ? "border-rose-400/60" : ""}`}
                    required
                  />
                </div>
                <div
                  id="message-hint"
                  className={`mt-2 flex flex-wrap items-center justify-between gap-2 text-sm ${
                    getVisibleError("message") ? "text-rose-300" : "text-slate-500"
                  }`}
                >
                  <span>
                    {getVisibleError("message") ||
                      "Add enough detail for us to understand the work scope."}
                  </span>
                  <span>{messageLength}/{MAX_MESSAGE_LENGTH}</span>
                </div>
              </motion.div>

              {submitState.type !== "idle" && (
                <div
                  role={submitState.type === "error" ? "alert" : "status"}
                  className={`mt-6 rounded-2xl border px-4 py-3 text-sm ${
                    submitState.type === "success"
                      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
                      : "border-rose-400/20 bg-rose-400/10 text-rose-200"
                  }`}
                >
                  {submitState.message}
                </div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{
                  scale: isSubmitting ? 1 : 1.02,
                  boxShadow: isSubmitting ? "none" : "0 20px 40px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`neon-button mt-8 w-full ${isSubmitting ? "opacity-70" : ""} btn-glow-cyan`}
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg
                        className="h-5 w-5 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4Z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Enquiry
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
