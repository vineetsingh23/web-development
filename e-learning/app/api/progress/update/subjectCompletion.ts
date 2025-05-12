export async function getSubjectProgress(user_id: string, subject_id: string) {
    const { data: totalChapters } = await supabase
      .from("chapters")
      .select("id", { count: "exact" })
      .eq("subject_id", subject_id);
  
    const { data: completed } = await supabase
      .from("user_progress")
      .select("id", { count: "exact" })
      .eq("user_id", user_id)
      .eq("chapter_done", true)
      .in("chapter_id",
        supabase
          .from("chapters")
          .select("id")
          .eq("subject_id", subject_id)
      );
  
    const percent = (completed?.length ?? 0) / (totalChapters?.length ?? 1) * 100;
    return Math.floor(percent);
  }
  