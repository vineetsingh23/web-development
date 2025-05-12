// app/api/progress/update/route.ts
import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { user_id, chapter_id, mcq_done, desc_done } = await req.json();

  const chapter_done = mcq_done && desc_done;

  const { error } = await supabase
    .from("user_progress")
    .upsert({
      user_id,
      chapter_id,
      mcq_done,
      desc_done,
      chapter_done,
    }, { onConflict: ['user_id', 'chapter_id'] });

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json({ message: "Progress updated" });
}
