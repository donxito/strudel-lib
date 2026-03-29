"use client";

import { useState, useRef } from "react";
import { Sketch } from "@/lib/types";
import { TagPill } from "./tag-pill";
import { ActionBtn } from "./action-btn";

interface EditorModalProps {
  sketch: Sketch | null; // null = creating new
  onSave: (data: {
    title: string;
    code: string;
    bpm: string;
    tags: string[];
  }) => void;
  onClose: () => void;
}

export function EditorModal({ sketch, onSave, onClose }: EditorModalProps) {
  const [title, setTitle] = useState(sketch?.title ?? "");
  const [code, setCode] = useState(sketch?.code ?? "");
  const [bpm, setBpm] = useState(sketch?.bpm ?? "");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(sketch?.tags ?? []);
  const codeRef = useRef<HTMLTextAreaElement>(null);

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
      setTagInput("");
    }
  };

  const handleSave = () => {
    if (!title.trim() || !code.trim()) return;
    onSave({
      title: title.trim(),
      code: code.trim(),
      bpm: bpm.trim(),
      tags,
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-5"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-950 border border-zinc-800 rounded-lg w-full max-w-[640px] max-h-[90vh] overflow-auto p-7"
      >
        <h2 className="m-0 mb-6 text-sm font-mono uppercase tracking-[3px] text-amber-500">
          {sketch ? "edit sketch" : "new sketch"}
        </h2>

        <div className="flex flex-col gap-4">
          {/* Title + BPM */}
          <div className="flex gap-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="sketch title"
              className="flex-1 px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded text-sm font-mono text-zinc-200 outline-none focus:border-zinc-700 placeholder:text-zinc-600"
            />
            <input
              value={bpm}
              onChange={(e) => setBpm(e.target.value)}
              placeholder="bpm"
              className="w-20 px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded text-sm font-mono text-zinc-200 outline-none focus:border-zinc-700 placeholder:text-zinc-600"
            />
          </div>

          {/* Tags */}
          <div>
            <div className="flex gap-1.5 mb-2 flex-wrap">
              {tags.map((t) => (
                <TagPill
                  key={t}
                  tag={t}
                  removable
                  onRemove={() => setTags(tags.filter((x) => x !== t))}
                />
              ))}
            </div>
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTag()}
              placeholder="add tag + enter"
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded text-sm font-mono text-zinc-200 outline-none focus:border-zinc-700 placeholder:text-zinc-600"
            />
          </div>

          {/* Code */}
          <textarea
            ref={codeRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="paste your strudel code here"
            spellCheck={false}
            className="w-full min-h-[240px] px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded text-[12px] font-mono leading-relaxed text-zinc-200 outline-none focus:border-zinc-700 placeholder:text-zinc-600 resize-y whitespace-pre"
            style={{ tabSize: 2 }}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault();
                const el = e.currentTarget;
                const start = el.selectionStart;
                const end = el.selectionEnd;
                setCode(code.substring(0, start) + "  " + code.substring(end));
                requestAnimationFrame(() => {
                  el.selectionStart = el.selectionEnd = start + 2;
                });
              }
            }}
          />

          {/* Actions */}
          <div className="flex gap-2 justify-end">
            <ActionBtn label="cancel" onClick={onClose} />
            <ActionBtn label="save sketch" onClick={handleSave} variant="primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
