"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, Bot, X } from "lucide-react";
import { fallbackReply, fallbackSuggestions, matchIntent, quickReplies, type Suggestion } from "./assistant-knowledge";
import { site } from "@/lib/site";

type Message = { from: "bot" | "user"; text: string; suggestions?: Suggestion[]; actions?: boolean };
type Stage = "chat" | "name" | "email" | "phone" | "need" | "sending" | "done";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const greeting: Message = {
  from: "bot",
  text: `Hi! I'm the ${site.name} Growth Assistant. I can help you find the right service, answer common questions, or pass your details to our team. What are you looking to improve?`,
};

const leadPrompts: Record<"name" | "email" | "phone" | "need", string> = {
  name: "Great. What's your name?",
  email: "Thanks! What's the best email address to reach you?",
  phone: "And a phone or WhatsApp number? (Optional: type “skip”.)",
  need: "Finally, briefly tell us about your business and what you'd like help with.",
};

export function ChatPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [input, setInput] = useState("");
  const [stage, setStage] = useState<Stage>("chat");
  const [lead, setLead] = useState({ name: "", email: "", phone: "", message: "" });
  const [interest, setInterest] = useState<string[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, stage]);

  const push = (...m: Message[]) => setMessages((prev) => [...prev, ...m]);

  const startLead = () => {
    setStage("name");
    push({ from: "bot", text: leadPrompts.name });
  };

  const submitLead = async (data: typeof lead) => {
    setStage("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || undefined,
          message: data.message,
          services: interest,
          source: "assistant",
          page: pathname,
        }),
      });
      if (!res.ok) throw new Error();
      setStage("done");
      push({
        from: "bot",
        text: `Thank you, ${data.name.split(" ")[0]}. Your details have been sent to our team, and someone will be in touch. If you'd like to share more, you can also book a consultation.`,
        suggestions: [{ label: "Book a Free Consultation", href: "/contact" }],
      });
    } catch {
      setStage("chat");
      push({
        from: "bot",
        text: "Sorry, something went wrong sending your details. Please try again, or use the contact page.",
        suggestions: [{ label: "Contact Page", href: "/contact" }],
      });
    }
  };

  const handle = (raw: string) => {
    const text = raw.trim();
    if (!text || stage === "sending") return;
    push({ from: "user", text });
    setInput("");

    if (stage === "name") {
      if (text.length < 2) return push({ from: "bot", text: "Could you share your name?" });
      setLead((l) => ({ ...l, name: text }));
      setStage("email");
      return push({ from: "bot", text: leadPrompts.email });
    }
    if (stage === "email") {
      if (!EMAIL_RE.test(text)) return push({ from: "bot", text: "That doesn't look like a valid email. Could you check it?" });
      setLead((l) => ({ ...l, email: text }));
      setStage("phone");
      return push({ from: "bot", text: leadPrompts.phone });
    }
    if (stage === "phone") {
      const skip = /^(skip|no|none|-)$/i.test(text);
      if (!skip && !/^[+\d][\d\s().-]{5,}$/.test(text)) {
        return push({ from: "bot", text: "Please enter a valid number, or type “skip”." });
      }
      setLead((l) => ({ ...l, phone: skip ? "" : text }));
      setStage("need");
      return push({ from: "bot", text: leadPrompts.need });
    }
    if (stage === "need") {
      const data = { ...lead, message: text };
      setLead(data);
      push({ from: "bot", text: "Sending your details…" });
      void submitLead(data);
      return;
    }

    // Free conversation.
    if (/^(yes|yeah|sure|ok|okay|please)\b/i.test(text) && messages[messages.length - 1]?.actions) {
      return startLead();
    }
    const intent = matchIntent(text);
    if (intent?.id === "contact") {
      push({ from: "bot", text: intent.reply, suggestions: intent.suggestions });
      return startLead();
    }
    if (intent) {
      setInterest((prev) => (prev.includes(intent.id) ? prev : [...prev, intent.id]));
      return push({ from: "bot", text: intent.reply, suggestions: intent.suggestions, actions: true });
    }
    push({ from: "bot", text: fallbackReply, suggestions: fallbackSuggestions, actions: true });
  };

  const inLeadFlow = stage !== "chat" && stage !== "done";

  return (
    <section
      id="growth-assistant"
      role="dialog"
      aria-label={`${site.name} Growth Assistant`}
      hidden={!open}
      className={`${open ? "flex" : "hidden"} h-[min(600px,calc(100dvh-7rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-2xl shadow-black/60 sm:w-[380px]`}
    >
      <header className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="icon-tile h-9 w-9 rounded-full">
            <Bot className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold text-white">Growth Assistant</p>
            <p className="text-xs text-slate-500">Automated guide · general information only</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-2 text-slate-400 hover:bg-white/5 hover:text-white"
          aria-label="Close assistant"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                m.from === "user" ? "rounded-br-md bg-brand-blue text-white" : "rounded-bl-md bg-ink-800 text-slate-200"
              }`}
            >
              <p>{m.text}</p>
              {m.suggestions && (
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {m.suggestions.map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        onClick={onClose}
                        className="inline-block rounded-full border border-brand-blue/40 px-2.5 py-1 text-xs font-medium text-brand-sky hover:bg-brand-blue/10"
                      >
                        {s.label} →
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {m.actions && i === messages.length - 1 && stage === "chat" && (
                <button
                  type="button"
                  onClick={startLead}
                  className="mt-2.5 block text-xs font-semibold text-white underline decoration-white/30 underline-offset-2 hover:decoration-white"
                >
                  Share my details with a specialist
                </button>
              )}
            </div>
          </div>
        ))}

        {messages.length === 1 && (
          <ul className="flex flex-wrap gap-2 pt-1" aria-label="Suggested questions">
            {quickReplies.map((q) => (
              <li key={q}>
                <button
                  type="button"
                  onClick={() => handle(q)}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-300 transition hover:border-brand-blue/50 hover:text-white"
                >
                  {q}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form
        className="border-t border-white/[0.07] p-3"
        onSubmit={(e) => {
          e.preventDefault();
          handle(input);
        }}
      >
        <div className="flex items-center gap-2">
          <label htmlFor="assistant-input" className="sr-only">
            Message
          </label>
          <input
            id="assistant-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={stage === "sending"}
            type={stage === "email" ? "email" : stage === "phone" ? "tel" : "text"}
            autoComplete={stage === "name" ? "name" : stage === "email" ? "email" : stage === "phone" ? "tel" : "off"}
            placeholder={inLeadFlow ? "Type your answer…" : "Ask about our services…"}
            className="field rounded-full py-2.5"
            maxLength={1000}
          />
          <button
            type="submit"
            disabled={!input.trim() || stage === "sending"}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-ink-950 transition hover:bg-slate-200 disabled:opacity-40"
            aria-label="Send message"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-2 px-1 text-[0.7rem] leading-snug text-slate-500">
          By sharing details you agree to our{" "}
          <Link href="/privacy-policy" onClick={onClose} className="underline hover:text-slate-300">
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </section>
  );
}
