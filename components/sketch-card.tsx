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
  currentUser: string;
  onToggle: () => void;
  onEdit: (sketch: Sketch) => void;
  onDelete: (id: string) => void;
  onTagClick: (tag: string) => void;
}

export function SketchCard({
  sketch,
  expanded,
  currentUser,
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
        className="w-full text-left p-3 px-4 sm:p-4 sm:px-5 flex justify-between items-start gap-2 sm:gap-3 cursor-pointer bg-transparent border-none"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2.5 mb-2 flex-wrap">
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
        <div className="flex flex-col items-end gap-0.5 shrink-0">
          {sketch.owner && (
            <span className="text-[11px] text-zinc-500 font-mono">
              {sketch.owner}
            </span>
          )}
          <span className="text-[11px] text-zinc-600 font-mono whitespace-nowrap opacity-50">
            {timeAgo(sketch.created_at)}
          </span>
        </div>
      </div>

      {/* Expanded body */}
      {expanded && (
        <div className="px-4 sm:px-5 pb-4">
          <CodeBlock code={sketch.code} />
          <div className="grid grid-cols-2 sm:flex gap-2 mt-3 sm:flex-wrap">
            <ActionBtn label="← back" onClick={onToggle} />
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
            {currentUser === sketch.owner && (
              <>
                <ActionBtn label="edit" onClick={() => onEdit(sketch)} />
                <ActionBtn
                  label="delete"
                  onClick={() => onDelete(sketch.id)}
                  variant="danger"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
