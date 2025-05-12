"use client";

import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Textbook {
  id: number;
  title: string;
  // Assuming you might have a slug for textbooks as well for potential future use
  slug?: string;
}

interface TextbookParams {
  [key: string]: string | undefined;
  courses: string;
  subjects: string;
  textbooks?: string; // Not used for fetching the list, but part of the path
}

interface Subject {
  id: string;
  slug: string;
}

export default function TextbooksPage() {
  const { courses: courseSlug, subjects: subjectSlug } =
    useParams<TextbookParams>();
  const [textbooks, setTextbooks] = useState<Textbook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subjectId, setSubjectId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubjectId = async () => {
      if (subjectSlug) {
        const { data: subjectData, error: subjectError } = await supabase
          .from("subjects")
          .select("id")
          .eq("slug", subjectSlug)
          .single();

        if (subjectError) {
          setError("Failed to fetch subject information.");
          setLoading(false);
          return;
        }

        if (subjectData) {
          setSubjectId(subjectData.id);
        } else {
          setError("Subject not found.");
          setLoading(false);
          return;
        }
      }
    };

    fetchSubjectId();
  }, [supabase, subjectSlug]);

  useEffect(() => {
    const fetchTextbooks = async () => {
      if (subjectId !== null) {
        try {
          setLoading(true);
          const { data, error } = await supabase
            .from("textbooks")
            .select("id, title,slug") // Fetch the necessary fields
            .eq("subject_id", subjectId); // Use the fetched subject ID

          // Inside the second useEffect (fetchTextbooks)

          if (error) {
            setError(error.message);
          } else {
            setTextbooks(data || []);
          }
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTextbooks();
  }, [subjectId]); // Re-run when subjectId changes

  if (loading) {
    return <div>Loading textbooks...</div>;
  }

  if (error) {
    return <div>Error loading textbooks: {error}</div>;
  }

  return (
    <div>
      <h3>
        Textbooks for {subjectSlug?.toUpperCase()} under{" "}
        {courseSlug?.toUpperCase()}
      </h3>
      <ul>
        {textbooks.map((textbook) => (
          <li key={textbook.id}>
            <Link
              href={`/courses/${courseSlug}/${subjectSlug}/${textbook.slug}`}
            >
              {textbook.title.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
      <Link href={`/courses/${courseSlug}`}>
        <button>Back to Subjects</button>
      </Link>
    </div>
  );
}
