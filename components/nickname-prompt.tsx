"use client";

import { useState } from "react";
import { ActionBtn } from "./action-btn";

interface NicknamePromptProps {
  onSave: (name: string) => void;
}

export function NicknamePrompt({ onSave }: NicknamePromptProps) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value.trim()) onSave(value.trim());
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        <div className="text-center">
          <h1 className="text-[13px] font-bold font-mono uppercase tracking-[4px] text-amber-500">
            strudel library
          </h1>
          <p className="mt-3 text-sm text-zinc-500 font-mono">
            pick a nickname to tag your sketches
          </p>
        </div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="your nickname"
          autoFocus
          className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded text-sm font-mono text-zinc-200 outline-none focus:border-amber-500/50 placeholder:text-zinc-600 text-center"
        />
        <ActionBtn
          label="let's go"
          onClick={handleSubmit}
          variant="primary"
        />
      </div>
    </div>
  );
}
