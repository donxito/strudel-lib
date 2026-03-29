"use client";

import { useState, useEffect, useCallback } from "react";
import { Sketch } from "@/lib/types";
import { generateId } from "@/lib/utils";
import { STARTER_SKETCHES } from "@/lib/seed-data";

const STORAGE_KEY = "strudel-sketches";

export function useSketches() {
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
    (data: Omit<Sketch, "id" | "created">) => {
      const sketch: Sketch = {
        ...data,
        id: generateId(),
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

  const allTags = [...new Set(sketches.flatMap((s) => s.tags))].sort();

  return {
    sketches,
    allTags,
    loaded,
    addSketch,
    updateSketch,
    deleteSketch,
  };
}
