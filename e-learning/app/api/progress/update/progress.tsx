const markChapterAsDone = async () => {
    await fetch("/api/progress/update", {
      method: "POST",
      body: JSON.stringify({
        user_id: user.id,
        chapter_id: chapterId,
        mcq_done: true,
        desc_done: true,
      }),
    });
  };
  