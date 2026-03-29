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
      className="fixed inset-0 bg-zinc-950 sm:bg-black/70 sm:backdrop-blur-sm flex items-stretch sm:items-center justify-center z-50 sm:p-5"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-950 sm:border sm:border-zinc-800 sm:rounded-lg w-full max-w-[720px] overflow-auto p-4 pt-3 sm:p-8 sm:max-h-[85vh]"
      >
        {/* Sticky header on mobile */}
        <div className="flex justify-between items-center mb-4 sm:mb-6 sticky top-0 bg-zinc-950 py-2 -mt-2 z-10 border-b border-zinc-800/50 sm:border-none sm:static sm:py-0 sm:mt-0">
          <h2 className="m-0 text-sm font-mono uppercase tracking-[3px] text-amber-500">
            reference
          </h2>
          <ActionBtn label="close" onClick={onClose} />
        </div>

        <div className="
          max-w-none font-mono text-[13px] leading-relaxed text-zinc-400
          [&_h1]:text-amber-500 [&_h1]:text-sm [&_h1]:tracking-wide [&_h1]:uppercase [&_h1]:border-b [&_h1]:border-zinc-800 [&_h1]:pb-2 [&_h1]:mb-4
          [&_h2]:text-amber-400/80 [&_h2]:text-[13px] [&_h2]:tracking-wide [&_h2]:uppercase [&_h2]:mt-8 [&_h2]:mb-3
          [&_h3]:text-zinc-200 [&_h3]:text-[13px] [&_h3]:mt-5 [&_h3]:mb-2
          [&_table]:w-full [&_table]:text-[11px] [&_table]:block [&_table]:overflow-x-auto [&_table]:whitespace-nowrap
          [&_thead]:block [&_thead]:w-full [&_tbody]:block [&_tbody]:w-full [&_tr]:flex [&_tr]:w-full
          [&_th]:flex-1 [&_th]:text-left [&_th]:text-zinc-500 [&_th]:uppercase [&_th]:tracking-wide [&_th]:py-1.5 [&_th]:px-2 [&_th]:border-b [&_th]:border-zinc-800 [&_th]:min-w-[80px]
          [&_td]:flex-1 [&_td]:py-1.5 [&_td]:px-2 [&_td]:border-b [&_td]:border-zinc-800/50 [&_td]:text-zinc-300 [&_td]:min-w-[80px]
          [&_code]:text-amber-300 [&_code]:bg-zinc-900 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[11px] [&_code]:break-all
          [&_pre]:bg-zinc-900 [&_pre]:border [&_pre]:border-zinc-800 [&_pre]:rounded [&_pre]:p-3 [&_pre]:overflow-x-auto [&_pre]:text-[11px] [&_pre]:-mx-1
          [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:break-normal
          [&_blockquote]:border-l-2 [&_blockquote]:border-amber-500/40 [&_blockquote]:pl-3 [&_blockquote]:text-zinc-500 [&_blockquote]:italic [&_blockquote]:text-[12px]
          [&_hr]:border-zinc-800 [&_hr]:my-6
          [&_p]:text-[12px] [&_p]:leading-relaxed [&_p]:mb-3
          [&_em]:text-zinc-600
          [&_ul]:text-[12px] [&_ul]:pl-4 [&_ul]:mb-3
          [&_ol]:text-[12px] [&_ol]:pl-4 [&_ol]:mb-3
          [&_li]:mb-1 [&_li]:text-zinc-400
        ">
          <Markdown>{content}</Markdown>
        </div>
      </div>
    </div>
  );
}
