"use client";

import { useState } from "react";
import { Sketch } from "@/lib/types";
import { encodeStrudelURL, timeAgo } from "@/lib/utils";
import { TagPill } from "./tag-pill";
import { CodeBlock } from "./code-block";
import { ActionBtn } from "./action-btn";

interface SketchCardProps {
  sketch: Sketch;
  expanded: boolean;
  onToggle: () => void;
  onEdit: (sketch: Sketch) => void;
  onDelete: (id: string) => void;
  onTagClick: (tag: string) => void;
}

export function SketchCard({
  sketch,
  expanded,
  onToggle,
  onEdit,
  onDelete,
  onTagClick,
}: SketchCardProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(sketch.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-md overflow-hidden transition-colors hover:border-amber-500/25">
      {/* role="button": native button may only contain phrasing content; block children caused DOM repair + hydration mismatches */}
      <div
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
        className="w-full text-left p-4 px-5 flex justify-between items-start gap-3 cursor-pointer bg-transparent border-none"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-2">
            <h3 className="m-0 text-[15px] font-semibold text-zinc-200 font-mono">
              {sketch.title}
            </h3>
            {sketch.category && (
              <span className="text-[11px] text-amber-500/60 font-mono uppercase tracking-wide">
                {sketch.category}
              </span>
            )}
            {sketch.bpm && (
              <span className="text-[11px] text-zinc-600 font-mono">
                {sketch.bpm} bpm
              </span>
            )}
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {sketch.tags.map((tag) => (
              <TagPill
                key={tag}
                tag={tag}
                onClick={(e) => {
                  e.stopPropagation();
                  onTagClick(tag);
                }}
              />
            ))}
          </div>
        </div>
        <span className="text-[11px] text-zinc-600 font-mono whitespace-nowrap opacity-50">
          {timeAgo(sketch.created)}
        </span>
      </div>

      {/* Expanded body */}
      {expanded && (
        <div className="px-5 pb-4">
          <CodeBlock code={sketch.code} />
          <div className="flex gap-2 mt-3 flex-wrap">
            <ActionBtn
              label={copied ? "✓ copied" : "copy code"}
              onClick={copyCode}
            />
            <ActionBtn
              label="open in strudel ↗"
              onClick={() =>
                window.open(encodeStrudelURL(sketch.code), "_blank")
              }
              variant="primary"
            />
            <ActionBtn label="edit" onClick={() => onEdit(sketch)} />
            <ActionBtn
              label="delete"
              onClick={() => onDelete(sketch.id)}
              variant="danger"
            />
          </div>
        </div>
      )}
    </div>
  );
}
