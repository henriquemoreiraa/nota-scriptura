"use client";

import { marked } from "marked";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { NotionPageContent } from "@/types/notion-pages";
import { UseMutationResult } from "@tanstack/react-query";
import { NotionEditorLoading } from "./notion-editor-loading";
import { AxiosResponse } from "axios";

interface NotionEditorProps {
  query: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    {
      pageId: string;
    },
    unknown
  >;
}

export const NotionEditor = ({ query }: NotionEditorProps) => {
  const content: NotionPageContent = query?.data?.data;

  const editor = useEditor(
    {
      extensions: [StarterKit],
      content: marked.parse(content?.parent || ""),
      onUpdate: ({ editor }) => console.log(editor.getJSON()),
      editorProps: {
        attributes: {
          class:
            "focus:outline-none mt-10 mx-10 prose dark:prose-invert prose-headings:my-1 prose-p:my-0 prose-headings:text-zinc-800 marker:text-zinc-800",
        },
      },
    },
    [content]
  );

  if (query?.status === "pending" || query?.status === "idle") {
    return <NotionEditorLoading />;
  }

  return <EditorContent editor={editor} />;
};
