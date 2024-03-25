"use client";

import { BibleEditorLoading } from "./bible-editor-loading";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { editorClass } from "../constants";
import { BibleVerse } from "./bible-verse";
import { useBible } from "@/hooks/use-bible";

export const BibleEditor = () => {
  const {
    bible,
    book,
    verses,
    selectedVerses,
    changeChapter,
    setSelectedVerses,
  } = useBible();

  if (!bible || !book) {
    return <BibleEditorLoading />;
  }

  return (
    <>
      <h4 className="text-sm px-10 font-bold">
        {bible.book.name} {bible.chapter.number}
      </h4>
      <div
        className={`${editorClass} prose-strong:ml-5 prose-strong:text-xs prose-strong:relative prose-strong:bottom-[6px]`}
      >
        {verses.map((verse) => (
          <BibleVerse
            verse={{ ...verse, chapter: bible.chapter.number }}
            setSelectedVerses={setSelectedVerses}
            key={verse.number}
            selectedVerses={selectedVerses}
          />
        ))}
      </div>
      <div className="w-full flex justify-between sm:px-10 sm:pt-10">
        <Button
          variant="link"
          data-chapter={bible.chapter.number - 1 === 0}
          className="data-[chapter=true]:invisible"
          onClick={() => changeChapter({ isNext: false })}
        >
          <ChevronLeft /> Capítulo {bible.chapter.number - 1}
        </Button>
        <Button variant="link" className="text-xs" disabled>
          Capítulo {bible.chapter.number}
        </Button>
        <Button
          variant="link"
          data-chapter={bible.chapter.number === book.chapters}
          className="data-[chapter=true]:invisible"
          onClick={() => changeChapter({ isNext: true })}
        >
          Capítulo {bible.chapter.number + 1} <ChevronRight />
        </Button>
      </div>
    </>
  );
};
