"use client";

import { useState, useMemo, useRef } from "react";
import { Sketch } from "@/lib/types";
import { useSketches } from "@/hooks/use-sketches";
import { useNickname } from "@/hooks/use-nickname";
import { SketchCard } from "@/components/sketch-card";
import { EditorModal } from "@/components/editor-modal";
import { NicknamePrompt } from "@/components/nickname-prompt";
import { SearchBar } from "@/components/search-bar";
import { TagPill } from "@/components/tag-pill";
import { ActionBtn } from "@/components/action-btn";

type EditorState = { open: false } | { open: true; sketch: Sketch | null }; // null = new sketch

export default function LibraryPage() {
  const { nickname, loaded: nicknameLoaded, setNickname, clearNickname } = useNickname();
  const { sketches, allTags, allCategories, loaded, addSketch, updateSketch, deleteSketch, exportSketches, importSketches } =
    useSketches(nickname ?? undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [editor, setEditor] = useState<EditorState>({ open: false });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return sketches.filter((s) => {
      if (categoryFilter && s.category !== categoryFilter) return false;
      if (filter && !s.tags.includes(filter)) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          s.title.toLowerCase().includes(q) ||
          s.tags.some((t) => t.includes(q)) ||
          s.code.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [sketches, filter, categoryFilter, search]);

  const handleSave = (data: {
    title: string;
    code: string;
    bpm: string;
    tags: string[];
    category: string;
  }) => {
    if (editor.open && editor.sketch) {
      updateSketch(editor.sketch.id, data);
    } else {
      addSketch(data);
    }
    setEditor({ open: false });
  };

  const handleTagClick = (tag: string) => {
    setFilter(filter === tag ? null : tag);
  };

  if (!loaded || !nicknameLoaded) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <span className="text-zinc-600 font-mono text-sm">loading...</span>
      </div>
    );
  }

  if (!nickname) {
    return <NicknamePrompt onSave={setNickname} />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200">
      {/* Header */}
      <header className="px-4 sm:px-8 pt-8 sm:pt-10 pb-6 sm:pb-8 border-b border-zinc-800/80">
        <div className="flex justify-between items-start gap-4 flex-wrap">
          <div>
            <h1 className="m-0 text-[13px] font-bold font-mono uppercase tracking-[4px] text-amber-500">
              strudel library
            </h1>
            <p className="mt-1.5 mb-0 text-[12px] text-zinc-600 font-mono tracking-wide">
              {sketches.length} sketch{sketches.length !== 1 && "es"} · by{" "}
              <span className="text-zinc-400">{nickname}</span>
              <button
                onClick={clearNickname}
                className="ml-2 text-zinc-700 hover:text-zinc-400 transition-colors cursor-pointer bg-transparent border-none font-mono text-[11px]"
              >
                change
              </button>
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <ActionBtn label="export" onClick={exportSketches} />
            <ActionBtn
              label="import"
              onClick={() => fileInputRef.current?.click()}
            />
            <ActionBtn
              label="+ new sketch"
              onClick={() => setEditor({ open: true, sketch: null })}
              variant="primary"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) importSketches(file);
                e.target.value = "";
              }}
            />
          </div>
        </div>

        {/* Search + Tags */}
        <div className="mt-6">
          <SearchBar value={search} onChange={setSearch} />
          {allCategories.length > 0 && (
            <div className="flex gap-1.5 flex-wrap mt-3 items-center">
              <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-wide mr-1">category</span>
              <TagPill
                tag="all"
                active={!categoryFilter}
                onClick={() => setCategoryFilter(null)}
              />
              {allCategories.map((cat) => (
                <TagPill
                  key={cat}
                  tag={cat}
                  active={categoryFilter === cat}
                  onClick={() => setCategoryFilter(categoryFilter === cat ? null : cat)}
                />
              ))}
            </div>
          )}
          <div className="flex gap-1.5 flex-wrap mt-2 items-center">
            <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-wide mr-1">tags</span>
            <TagPill
              tag="all"
              active={!filter}
              onClick={() => setFilter(null)}
            />
            {allTags.map((tag) => (
              <TagPill
                key={tag}
                tag={tag}
                active={filter === tag}
                onClick={() => handleTagClick(tag)}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Sketch List */}
      <main className="px-4 sm:px-8 py-4 sm:py-6 flex flex-col gap-2">
        {filtered.length === 0 && (
          <p className="text-zinc-600 text-sm text-center py-10 font-mono">
            {sketches.length === 0
              ? "no sketches yet — create your first one"
              : "no matches"}
          </p>
        )}
        {filtered.map((sketch) => (
          <SketchCard
            key={sketch.id}
            sketch={sketch}
            expanded={expandedId === sketch.id}
            currentUser={nickname}
            onToggle={() =>
              setExpandedId(expandedId === sketch.id ? null : sketch.id)
            }
            onEdit={(s) => setEditor({ open: true, sketch: s })}
            onDelete={(id) => {
              deleteSketch(id);
              if (expandedId === id) setExpandedId(null);
            }}
            onTagClick={handleTagClick}
          />
        ))}
      </main>

      {/* Editor Modal */}
      {editor.open && (
        <EditorModal
          sketch={editor.sketch}
          onSave={handleSave}
          onClose={() => setEditor({ open: false })}
        />
      )}
    </div>
  );
}
