// components/ChapterNavigation.tsx
"use client";

export default function ChapterNavigation({ chapterId }: { chapterId: string }) {
  return (
    <div className="flex justify-between mt-6">
      <button className="bg-gray-200 px-4 py-2 rounded">← Previous</button>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Next →</button>
    </div>
  );
}
