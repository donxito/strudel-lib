"use client";

import { useState, useEffect, useCallback } from "react";
import { Sketch } from "@/lib/types";
import { generateId } from "@/lib/utils";
import { STARTER_SKETCHES } from "@/lib/seed-data";

const STORAGE_KEY = "strudel-sketches";

export function useSketches(owner?: string) {
  const [sketches, setSketches] = useState<Sketch[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setSketches(JSON.parse(raw));
      } else {
        setSketches(STARTER_SKETCHES);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(STARTER_SKETCHES));
      }
    } catch {
      setSketches(STARTER_SKETCHES);
    }
    setLoaded(true);
  }, []);

  const persist = useCallback((next: Sketch[]) => {
    setSketches(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.error("Failed to save sketches:", e);
    }
  }, []);

  const addSketch = useCallback(
    (data: Omit<Sketch, "id" | "created" | "owner">) => {
      const sketch: Sketch = {
        ...data,
        id: generateId(),
        owner: owner ?? "",
        created: Date.now(),
      };
      persist([sketch, ...sketches]);
      return sketch;
    },
    [sketches, persist]
  );

  const updateSketch = useCallback(
    (id: string, data: Partial<Sketch>) => {
      persist(sketches.map((s) => (s.id === id ? { ...s, ...data } : s)));
    },
    [sketches, persist]
  );

  const deleteSketch = useCallback(
    (id: string) => {
      persist(sketches.filter((s) => s.id !== id));
    },
    [sketches, persist]
  );

  const exportSketches = useCallback(() => {
    const json = JSON.stringify(sketches, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `strudel-library-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [sketches]);

  const importSketches = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string);
          if (!Array.isArray(data)) throw new Error("Invalid format");
          const valid = data.filter(
            (s: unknown): s is Sketch =>
              typeof s === "object" &&
              s !== null &&
              typeof (s as Sketch).title === "string" &&
              typeof (s as Sketch).code === "string"
          );
          if (valid.length === 0) return;
          // Merge: skip duplicates by id, prepend new ones
          const existingIds = new Set(sketches.map((s) => s.id));
          const newSketches = valid
            .map((s) => ({
              ...s,
              id: s.id && !existingIds.has(s.id) ? s.id : generateId(),
              created: s.created ?? Date.now(),
              tags: Array.isArray(s.tags) ? s.tags : [],
              bpm: s.bpm ?? "",
              category: s.category ?? "",
              owner: s.owner ?? "",
            }));
          persist([...newSketches, ...sketches]);
        } catch (e) {
          console.error("Failed to import sketches:", e);
        }
      };
      reader.readAsText(file);
    },
    [sketches, persist]
  );

  const allTags = [...new Set(sketches.flatMap((s) => s.tags))].sort();
  const allCategories = [...new Set(sketches.map((s) => s.category).filter(Boolean))].sort();

  return {
    sketches,
    allTags,
    allCategories,
    loaded,
    addSketch,
    updateSketch,
    deleteSketch,
    exportSketches,
    importSketches,
  };
}
