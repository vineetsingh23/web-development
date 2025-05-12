// components/ChapterNavigation.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Props {
  chapterId: string;
  canComplete: boolean;
}

export default function ChapterNavigation({ chapterId, canComplete }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const markChapterComplete = async () => {
    setLoading(true);

    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return alert('You must be logged in to save progress.');

    await supabase
      .from('user_progress')
      .upsert({ user_id: user.id, chapter_id: chapterId, completed: true }, { onConflict: ['user_id', 'chapter_id'] });

    setLoading(false);
    alert('Chapter marked as complete!');
  };

  return (
    <div className="flex justify-between items-center my-6">
      <button onClick={() => router.back()} className="bg-gray-200 px-4 py-2 rounded">
        ← Previous
      </button>
      <button
        className={`px-4 py-2 rounded ${canComplete ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}
        disabled={!canComplete || loading}
        onClick={markChapterComplete}
      >
        {loading ? 'Saving...' : 'Mark Chapter Complete →'}
      </button>
    </div>
  );
}
