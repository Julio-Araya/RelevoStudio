import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Permiso explícito a los crawlers de modelos de lenguaje: el sitio de un
// estudio que vende legibilidad tiene que ser legible para las máquinas.
const LLM_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...LLM_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
