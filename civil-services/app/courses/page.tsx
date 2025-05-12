'use client';

import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Course {
  id: number;
  title: string;
  slug: string;
  descriptions:string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from('courses').select('id, title, slug,descriptions');
        if (error) {
          setError(error.message);
        } else {
          setCourses(data || []);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [supabase]);

  if (loading) {
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div>Error loading courses: {error}</div>;
  }

  return (
    <div className='w-full h-screen items-center justify-center flex flex-col space-y-20 bg-gray-200'>
      <h1 className='text-4xl font-extrabold text-blue-400'>Welcome to Courses</h1>
      <ul className='grid grid-cols-2  gap-x-40 gap-y-20 text-center h-80 w-2/3 p-3'>
        {courses.map((course) => (
          <li key={course.id} className='rounded shadow-2xl py-4 border-2 border-slate-200'>
            <Link href={`/courses/${course.slug}`} className='text-2xl font-bold text-slate-500'>
              {course.title.toUpperCase()}
            <p className='text-slate-400 font-medium'>{course.descriptions}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/">
        <button className='bg-blue-600 text-white py-3 w-60 rounded-full text-lg font-bold hover:bg-blue-700'>Back to Home</button>
      </Link>
    </div>
  );
} 