'use client';

import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Subject {
  id: number;
  title: string;
  slug: string;
}

interface CourseParams {
  [key: string]: string;
  courses: string; // This matches the [courses] dynamic segment name (which is the course slug)
}

interface Course {
  id: string;
  slug: string;
}

export default function SubjectsPage() {
  const { courses: courseSlug } = useParams<CourseParams>();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [courseId, setCourseId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseId = async () => {
      if (courseSlug) {
        const { data: courseData, error: courseError } = await supabase
          .from('courses')
          .select('id')
          .eq('slug', courseSlug)
          .single();

        if (courseError) {
          console.error('Error fetching course ID:', courseError);
          setError('Failed to fetch course information.');
          setLoading(false);
          return;
        }

        if (courseData) {
          setCourseId(courseData.id);
        } else {
          setError('Course not found.');
          setLoading(false);
          return;
        }
      }
    };

    fetchCourseId();
  }, [supabase, courseSlug]);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (courseId !== null) {
        try {
          setLoading(true);
          const { data, error } = await supabase
            .from('subjects')
            .select('id, title, slug')
            .eq('course_id', courseId); // Use the fetched course ID

          if (error) {
            setError(error.message);
          } else {
            
            setSubjects(data || []);
          }
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSubjects();
  }, [supabase, courseId]); // Re-run when courseId changes

  if (loading) {
    return <div>Loading subjects...</div>;
  }

  if (error) {
    return <div>Error loading subjects: {error}</div>;
  }

  return (
    <div>
      <h2>Subjects for {courseSlug?.toUpperCase()}</h2>
      <ul>
        {subjects.map((subject) => (
          <li key={subject.id}>
            <Link href={`/courses/${courseSlug}/${subject.slug}`}>
              {subject.title.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/courses">
        <button>Back to Courses</button>
      </Link>
    </div>
  );
}