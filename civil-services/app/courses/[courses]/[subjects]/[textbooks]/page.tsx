// app/courses/[courses]/[subjects]/[textbook]/[chapter]/page.tsx
"use client";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Chapter {
  id: string;
  title: string;
  chapter_no: number;
  slug: string;
}

interface ChaptersParams {
  [key: string]: string | undefined;
  courses: string;
  subjects: string;
  textbooks: string;
  chapters?: string; //  [sections]
}

interface Textbook {
  id: string;
  slug: string;
}

export default function ChaptersPage() {
  const {
    courses: courseSlug,
    subjects: subjectSlug,
    textbooks: textbookSlug,
  } = useParams<ChaptersParams>();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [textbookId, setTextbookId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTextbookId = async () => {
      if (textbookSlug) {
        try {
          setLoading(true);
          const { data: textbookData, error: textbookError } = await supabase
            .from("textbooks")
            .select("id")
            .eq("slug", textbookSlug)
            .single();

          if (textbookError) {
            setError("Failed to fetch textbook information.");
            setLoading(false);
            return;
          }

          if (textbookData) {
            setTextbookId(textbookData.id);
          } else {
            setError("textbook not found.");
            setLoading(false);
            return;
          }
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTextbookId();
  }, [supabase, textbookSlug]);

  useEffect(() => {
    const fetchChapters = async () => {
      if (textbookId !== null) {
        try {
          setLoading(true);
          const { data, error } = await supabase
            .from("chapters")
            .select("id, title,slug")
            .eq("textbook_id", textbookId);
          // .order('chapter_no', { ascending: true });

          if (error) {
            setError(error.message);
          } else {
            setChapters(data || []);
          }
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchChapters();
  }, [supabase, textbookId]);

  if (loading) {
    return <div>Loading chapters...</div>;
  }

  if (error) {
    return <div>Error loading chapters: {error}</div>;
  }

  return (
    <div>
      <h3>
        Chapters for {textbookSlug?.toUpperCase()} under{" "}
        {subjectSlug?.toUpperCase()} under {courseSlug?.toUpperCase()}
      </h3>
      <ul>
        {chapters.map((ch) => (
          <li key={ch.id}>
            <Link
              href={`/courses/${courseSlug}/${subjectSlug}/${textbookSlug}/${ch.slug}`}
            >
              {ch.title.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
      <Link href={`/courses/${courseSlug}/${subjectSlug}/${textbookSlug}`}>
        <button>Back to textbooks</button>
      </Link>
    </div>
  );
}
