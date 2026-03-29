"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="search sketches..."
      className="w-full max-w-xs px-3.5 py-2.5 bg-zinc-900/60 border border-zinc-800 rounded text-sm font-mono text-zinc-200 outline-none focus:border-zinc-700 placeholder:text-zinc-600"
    />
  );
}
