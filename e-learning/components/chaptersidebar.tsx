// components/ChapterSidebar.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type Chapter = {
  id: string;
  title: string;
};

export default function ChapterSidebar({
  subjectId,
  currentChapterId,
  userId,
}: {
  subjectId: string;
  currentChapterId: string;
  userId: string;
}) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchChapters = async () => {
      const { data: chaps } = await supabase
        .from("chapters")
        .select("id, title")
        .eq("subject_id", subjectId)
        .order("order"); // optional order column

      setChapters(chaps || []);
    };

    const fetchProgress = async () => {
      const { data: prog } = await supabase
        .from("user_progress")
        .select("chapter_id, chapter_done")
        .eq("user_id", userId);

      const map = prog?.reduce((acc, row) => {
        acc[row.chapter_id] = row.chapter_done;
        return acc;
      }, {} as Record<string, boolean>) || {};

      setProgress(map);
    };

    fetchChapters();
    fetchProgress();
  }, [subjectId, userId]);

  return (
    <aside className="w-64 p-4 border-r bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Chapters</h2>
      <ul className="space-y-2">
        {chapters.map((chap) => (
          <li key={chap.id}>
            <Link
              href={`/course/upsc/history/${subjectId}/${chap.id}`}
              className={`flex justify-between items-center p-2 rounded hover:bg-gray-100 ${
                chap.id === currentChapterId ? "bg-blue-100 font-bold" : ""
              }`}
            >
              <span>{chap.title}</span>
              <span>{progress[chap.id] ? "✅" : "🔲"}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
