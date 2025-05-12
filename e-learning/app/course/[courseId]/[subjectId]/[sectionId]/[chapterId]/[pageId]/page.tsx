// // app/course/[courseId]/[subjectId]/[sectionId]/[chapterId]/page.tsx
// import { supabase } from "@/lib/supabaseClient";
// import MarkdownRenderer from "@/components/MarkdownRenderer";
// import ChapterNavigation from "@/components/ChapterNavigation";

// export default async function ChapterPage({ params }: { params: { chapterId: string } }) {
//   const { data: chapter, error } = await supabase
//     .from("chapters")
//     .select("title, content")
//     .eq("id", params.chapterId)
//     .single();

//   if (error) return <div>Error loading chapter</div>;

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">{chapter.title}</h1>
//       <MarkdownRenderer content={chapter.content} />
//       <ChapterNavigation chapterId={params.chapterId} />
//     </div>
//   );
// }
// app/course/[courseId]/[subjectId]/[sectionId]/[chapterId]/page.tsx
import ChapterSidebar from "@/components/ChapterSidebar";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { supabase } from "@/lib/supabaseClient";
import { cookies } from "next/headers";

export default async function ChapterPage({ params }) {
  const { chapterId, subjectId } = params;

  const { data: chapter } = await supabase
    .from("chapters")
    .select("title, content")
    .eq("id", chapterId)
    .single();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex">
      <ChapterSidebar
        subjectId={subjectId}
        currentChapterId={chapterId}
        userId={user?.id}
      />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">{chapter.title}</h1>
        <MarkdownRenderer content={chapter.content} />
        {/* Render MCQ + Descriptive blocks here */}
      </main>
    </div>
  );
}
