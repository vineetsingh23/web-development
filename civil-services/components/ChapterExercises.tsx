// components/ChapterExercises.tsx
'use client';

import { useEffect, useState } from 'react';

interface MCQ {
  id: string;
  question: string;
  choices: string[];
  correct_answer: number;
}

interface Subjective {
  id: string;
  question: string;
}

interface Props {
  chapterId: string;
  mcqs: MCQ[];
  subjective: Subjective[];
  onCompleteChange: (completed: boolean) => void;
}

export default function ChapterExercises({ chapterId, mcqs, subjective, onCompleteChange }: Props) {
  const [mcqAnswers, setMcqAnswers] = useState<{ [id: string]: number | null }>({});
  const [subjectiveAnswers, setSubjectiveAnswers] = useState<{ [id: string]: string }>({});

  useEffect(() => {
    const allMCQAnswered = mcqs.every((q) => mcqAnswers[q.id] !== null && mcqAnswers[q.id] !== undefined);
    const allSubjectiveAnswered = subjective.every((q) => subjectiveAnswers[q.id]?.trim().length > 0);
    onCompleteChange(allMCQAnswered && allSubjectiveAnswered);
  }, [mcqAnswers, subjectiveAnswers]);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">MCQs</h2>
      {mcqs.map((q, idx) => (
        <div key={q.id} className="mb-4">
          <p className="font-medium">{idx + 1}. {q.question}</p>
          {q.choices.map((choice, i) => (
            <label key={i} className="block">
              <input
                type="radio"
                name={`mcq-${q.id}`}
                value={i}
                checked={mcqAnswers[q.id] === i}
                onChange={() => setMcqAnswers({ ...mcqAnswers, [q.id]: i })}
              />
              {' '}{choice}
            </label>
          ))}
        </div>
      ))}

      <h2 className="text-xl font-semibold mt-8 mb-4">Subjective Questions</h2>
      {subjective.map((q, idx) => (
        <div key={q.id} className="mb-6">
          <p className="font-medium">{idx + 1}. {q.question}</p>
          <textarea
            rows={4}
            className="w-full border p-2"
            onChange={(e) => setSubjectiveAnswers({ ...subjectiveAnswers, [q.id]: e.target.value })}
            value={subjectiveAnswers[q.id] || ''}
          />
        </div>
      ))}
    </div>
  );
}
