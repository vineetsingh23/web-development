'use client';

import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Section {
  id: string;
  title: string;
  descriptions: string;
  slug: string;
}

interface SectionsParams {
  [key: string]: string | undefined;
  courses: string;
  subjects: string;
  textbooks: string;
  chapters: string;
}

export default function SectionsPage() {
  const {
    courses: courseSlug,
    subjects: subjectSlug,
    textbooks: textbookSlug,
    chapters: chapterSlug,
  } = useParams<SectionsParams>();

  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chapterId, setChapterId] = useState<string | null>(null);

  // Fetch chapter ID based on the chapter slug
  useEffect(() => {
    const fetchChapterId = async () => {
      if (chapterSlug) {
        try {
          setLoading(true);
          const { data: chapterData, error: chapterError } = await supabase
            .from('chapters')
            .select('id')
            .eq('slug', chapterSlug)
            .single();

          if (chapterError) {
            console.error('Error fetching chapter ID:', chapterError);
            setError('Failed to fetch chapter information.');
            return;
          }

          if (chapterData) {
            setChapterId(chapterData.id);
            console.log('Fetched chapter ID:', chapterData.id);
          } else {
            setError('Chapter not found.');
          }
        } catch (err: any) {
          console.error('Unexpected error fetching chapter ID:', err);
          setError('An unexpected error occurred while fetching chapter information.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchChapterId();
  }, [chapterSlug]);

  // Fetch sections based on the chapter ID
  useEffect(() => {
    const fetchSections = async () => {
      if (chapterId) {
        try {
          setLoading(true);
          const { data, error } = await supabase
            .from('sections')
            .select('id, title, slug, descriptions')
            .eq('chapter_id', chapterId)
            .order('id', { ascending: true });

          if (error) {
            console.error('Error fetching sections:', error);
            setError('Failed to fetch sections.');
          } else {
            setSections(data || []);
            console.log('Fetched sections:', data);
          }
        } catch (err: any) {
          console.error('Unexpected error fetching sections:', err);
          setError('An unexpected error occurred while fetching sections.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSections();
  }, [chapterId]);

  if (loading) {
    return <div>Loading sections...</div>;
  }

  if (error) {
    return <div>Error loading sections: {error}</div>;
  }

  return (
    <div>
      <h3>
        Sections for {textbookSlug?.toUpperCase()} under {subjectSlug?.toUpperCase()} under{' '}
        {courseSlug?.toUpperCase()}
      </h3>
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <span>{section.title}</span>
            <p>{section.descriptions}</p>
          </li>
        ))}
      </ul>
      <Link href={`/courses/${courseSlug}/${subjectSlug}/${textbookSlug}`}>
        <button>Back to textbooks</button>
      </Link>
    </div>
  );
}