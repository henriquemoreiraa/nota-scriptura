"use client";

import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/react";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Bible } from "@/types/bible";
import { BibleEditorLoading } from "./bible-editor-loading";

interface BibleEditorProps {
  query: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    {
      book: string;
    },
    unknown
  >;
}

export const BibleEditor = ({ query }: BibleEditorProps) => {
  const bible: Bible = query.data?.data;

  const editor = useEditor(
    {
      extensions: [StarterKit],
      editable: false,
      editorProps: {
        attributes: {
          class:
            "focus:outline-none mt-10 mx-10 prose dark:prose-invert prose-headings:my-1 prose-p:my-0 prose-headings:text-zinc-800 marker:text-zinc-800",
        },
      },
    },
    []
  );

  if (query?.status === "pending" || query?.status === "idle") {
    return <BibleEditorLoading />;
  }

  return (
    <EditorContent editor={editor}>
      <div className="mt-10 mx-10 prose dark:prose-invert prose-headings:my-1 prose-p:my-0 prose-headings:text-zinc-800 marker:text-zinc-800">
        <h4 className="pb-5 text-sm">
          {bible.book.name} {bible.chapter.number}
        </h4>
        {bible?.verses.map((verse) => (
          <div>
            <span className="mr-1 ml-5 text-xs relative bottom-[6px]">
              {verse.number}
            </span>
            {verse.text}
          </div>
        ))}
      </div>
    </EditorContent>
  );
};
