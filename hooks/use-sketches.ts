"use client";

import { useState, useEffect, useCallback } from "react";
import { Sketch } from "@/lib/types";
import { supabase } from "@/lib/supabase";

export function useSketches(owner?: string) {
  const [sketches, setSketches] = useState<Sketch[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Fetch all sketches from Supabase on mount
  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("sketches")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to load sketches:", error);
      } else {
        setSketches(data ?? []);
      }
      setLoaded(true);
    }
    load();
  }, []);

  const addSketch = useCallback(
    async (data: Omit<Sketch, "id" | "created_at" | "owner">) => {
      const row = { ...data, owner: owner ?? "" };
      const { data: inserted, error } = await supabase
        .from("sketches")
        .insert(row)
        .select()
        .single();

      if (error) {
        console.error("Failed to add sketch:", error);
        return null;
      }
      setSketches((prev) => [inserted, ...prev]);
      return inserted;
    },
    [owner]
  );

  const updateSketch = useCallback(
    async (id: string, data: Partial<Sketch>) => {
      const { error } = await supabase
        .from("sketches")
        .update(data)
        .eq("id", id);

      if (error) {
        console.error("Failed to update sketch:", error);
        return;
      }
      setSketches((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...data } : s))
      );
    },
    []
  );

  const deleteSketch = useCallback(async (id: string) => {
    const { error } = await supabase
      .from("sketches")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Failed to delete sketch:", error);
      return;
    }
    setSketches((prev) => prev.filter((s) => s.id !== id));
  }, []);

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
    async (file: File) => {
      const text = await file.text();
      try {
        const data = JSON.parse(text);
        if (!Array.isArray(data)) throw new Error("Invalid format");
        const valid = data.filter(
          (s: unknown): s is Sketch =>
            typeof s === "object" &&
            s !== null &&
            typeof (s as Sketch).title === "string" &&
            typeof (s as Sketch).code === "string"
        );
        if (valid.length === 0) return;

        const rows = valid.map((s) => ({
          title: s.title,
          code: s.code,
          tags: Array.isArray(s.tags) ? s.tags : [],
          bpm: s.bpm ?? "",
          category: s.category ?? "",
          owner: s.owner || owner || "",
        }));

        const { data: inserted, error } = await supabase
          .from("sketches")
          .insert(rows)
          .select();

        if (error) {
          console.error("Failed to import sketches:", error);
          return;
        }
        setSketches((prev) => [...(inserted ?? []), ...prev]);
      } catch (e) {
        console.error("Failed to import sketches:", e);
      }
    },
    [owner]
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
