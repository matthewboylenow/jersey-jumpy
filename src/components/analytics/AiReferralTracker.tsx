"use client";

import { useEffect } from "react";
import { trackEvent } from "fathom-client";

const AI_REFERRER_DOMAINS: Record<string, string> = {
  "chatgpt.com": "ChatGPT",
  "chat.openai.com": "ChatGPT",
  "openai.com": "OpenAI",
  "perplexity.ai": "Perplexity",
  "claude.ai": "Claude",
  "gemini.google.com": "Gemini",
  "bard.google.com": "Bard",
  "copilot.microsoft.com": "Copilot",
  "you.com": "You.com",
  "search.brave.com": "Brave Search",
  "meta.ai": "Meta AI",
};

export function AiReferralTracker() {
  useEffect(() => {
    try {
      const referrer = document.referrer;
      if (!referrer) return;

      const referrerHost = new URL(referrer).hostname;

      for (const [domain, source] of Object.entries(AI_REFERRER_DOMAINS)) {
        if (referrerHost === domain || referrerHost.endsWith(`.${domain}`)) {
          trackEvent(`AI Referral - ${source}`);
          break;
        }
      }
    } catch {
      // Ignore invalid referrer URLs
    }
  }, []);

  return null;
}
