"use client";

import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import { ActionBtn } from "./action-btn";

interface ReferenceModalProps {
  onClose: () => void;
}

export function ReferenceModal({ onClose }: ReferenceModalProps) {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/reference.md")
      .then((r) => r.text())
      .then(setContent)
      .catch(() => setContent("# Failed to load reference"));
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-5"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-950 border border-zinc-800 rounded-t-lg sm:rounded-lg w-full max-w-[720px] max-h-[95vh] sm:max-h-[85vh] overflow-auto p-5 sm:p-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="m-0 text-sm font-mono uppercase tracking-[3px] text-amber-500">
            reference
          </h2>
          <ActionBtn label="close" onClick={onClose} />
        </div>

        <div className="prose prose-invert prose-sm max-w-none font-mono
          [&_h1]:text-amber-500 [&_h1]:text-base [&_h1]:tracking-wide [&_h1]:uppercase [&_h1]:border-b [&_h1]:border-zinc-800 [&_h1]:pb-2
          [&_h2]:text-amber-400/80 [&_h2]:text-sm [&_h2]:tracking-wide [&_h2]:uppercase [&_h2]:mt-6 [&_h2]:mb-3
          [&_table]:w-full [&_th]:text-left [&_th]:text-zinc-500 [&_th]:text-[11px] [&_th]:uppercase [&_th]:tracking-wide [&_th]:py-1.5 [&_th]:border-b [&_th]:border-zinc-800
          [&_td]:py-1.5 [&_td]:text-[12px] [&_td]:border-b [&_td]:border-zinc-800/50 [&_td]:text-zinc-300
          [&_code]:text-amber-300 [&_code]:bg-zinc-900 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[11px]
          [&_pre]:bg-zinc-900 [&_pre]:border [&_pre]:border-zinc-800 [&_pre]:rounded [&_pre]:p-4 [&_pre_code]:bg-transparent [&_pre_code]:p-0
          [&_blockquote]:border-l-2 [&_blockquote]:border-amber-500/40 [&_blockquote]:pl-4 [&_blockquote]:text-zinc-500 [&_blockquote]:italic
          [&_hr]:border-zinc-800 [&_hr]:my-6
          [&_p]:text-zinc-400 [&_p]:text-[13px] [&_p]:leading-relaxed
          [&_em]:text-zinc-600
        ">
          <Markdown>{content}</Markdown>
        </div>
      </div>
    </div>
  );
}
