"use client";

import { cn } from "@/lib/utils";

interface ActionBtnProps {
  label: string;
  onClick: () => void;
  variant?: "default" | "primary" | "danger";
}

export function ActionBtn({ label, onClick, variant = "default" }: ActionBtnProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3.5 py-2 sm:py-1.5 rounded text-[11px] font-mono lowercase tracking-wide border transition-colors cursor-pointer",
        variant === "primary" &&
          "bg-amber-500 text-zinc-950 border-transparent hover:bg-amber-400",
        variant === "danger" &&
          "bg-transparent text-red-400 border-red-400/20 hover:bg-red-500 hover:text-white hover:border-transparent",
        variant === "default" &&
          "bg-transparent text-zinc-500 border-zinc-800 hover:bg-zinc-800 hover:text-zinc-300"
      )}
    >
      {label}
    </button>
  );
}
