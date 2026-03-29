"use client";

import type { MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface TagPillProps {
  tag: string;
  active?: boolean;
  removable?: boolean;
  onClick?: (e: MouseEvent<HTMLSpanElement>) => void;
  onRemove?: () => void;
}

export function TagPill({ tag, active, removable, onClick, onRemove }: TagPillProps) {
  return (
    <span
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 sm:py-0.5 rounded-sm text-[11px] font-mono uppercase tracking-wider border transition-colors",
        onClick && "cursor-pointer",
        active
          ? "bg-amber-500 text-zinc-950 border-amber-500"
          : "bg-zinc-800/50 text-zinc-500 border-zinc-800 hover:border-zinc-700"
      )}
    >
      {tag}
      {removable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="opacity-60 hover:opacity-100 ml-0.5"
        >
          ×
        </button>
      )}
    </span>
  );
}
