npm install @supabase/supabase-js


Fetchig Chapters (Example)

export async function getChapters(sectionId: string) {
  const { data, error } = await supabase
    .from('chapters')
    .select('*')
    .eq('section_id', sectionId)
    .order('order', { ascending: true });
  return data;
}


my-upsc-app/
├── app/
│   ├── layout.tsx                   # Global layout (header, footer, etc.)
│   ├── page.tsx                     # Home page (list all courses)
│   └── course/
│       └── [courseId]/              # Dynamic course (e.g., UPSC)
│           ├── page.tsx            # Subject list
│           └── [subjectId]/        # Dynamic subject (e.g., History)
│               ├── page.tsx        # Section list (Ancient, Modern etc.)
│               └── [sectionId]/    # Dynamic section
│                   ├── page.tsx    # Chapter list
│                   └── [chapterId]/
│                       └── page.tsx # Render chapter content dynamically
├── components/
│   ├── ChapterNavigation.tsx       # Next/Previous buttons
│   └── MarkdownRenderer.tsx        # Custom markdown to HTML
├── lib/
│   └── supabaseClient.ts           # Supabase client instance
├── styles/
│   └── globals.css                 # Tailwind styles
├── public/                         # Static files like images
├── tailwind.config.ts              # Tailwind config
├── tsconfig.json
├── .env.local                      # Supabase keys
└── README.md



