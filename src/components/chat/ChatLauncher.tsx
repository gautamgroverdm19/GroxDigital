"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { MessageSquare, X } from "lucide-react";

// The assistant panel is only downloaded when a visitor opens it.
const ChatPanel = dynamic(() => import("./ChatPanel").then((m) => m.ChatPanel), { ssr: false });

export function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {loaded && <ChatPanel open={open} onClose={() => setOpen(false)} />}
      <button
        type="button"
        onClick={() => {
          setLoaded(true);
          setOpen((v) => !v);
        }}
        aria-expanded={open}
        aria-controls="growth-assistant"
        aria-label={open ? "Close the Growth Assistant" : "Open the Growth Assistant"}
        className="group flex h-14 items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-violet px-4 text-sm font-semibold text-white shadow-[0_12px_40px_-10px_rgba(99,102,241,0.8)] transition hover:brightness-110"
      >
        {open ? <X className="h-5 w-5" aria-hidden="true" /> : <MessageSquare className="h-5 w-5" aria-hidden="true" />}
        <span className="hidden sm:inline">{open ? "Close" : "Ask us anything"}</span>
      </button>
    </div>
  );
}
