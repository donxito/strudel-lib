"use client";

interface CodeBlockProps {
  code: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
  return (
    <pre className="m-0 p-3 sm:p-4 bg-zinc-950 rounded border border-zinc-800 text-[11px] sm:text-[12px] font-mono leading-relaxed text-zinc-300 overflow-x-auto whitespace-pre-wrap wrap-break-word max-h-[50vh] overflow-y-auto">
      {code}
    </pre>
  );
}
