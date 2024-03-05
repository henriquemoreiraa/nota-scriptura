"use client";

import { marked } from "marked";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { NotionPageContent } from "@/types/notion-pages";
import { UseQueryResult } from "@tanstack/react-query";
import { NotionEditorLoading } from "./notion-editor-loading";
import { AxiosResponse } from "axios";

interface NotionEditorProps {
  query: UseQueryResult<AxiosResponse<any, any>, Error>;
}

export const NotionEditor = ({ query }: NotionEditorProps) => {
  const content: NotionPageContent = query.data?.data;

  const editor = useEditor(
    {
      extensions: [StarterKit],
      content: marked.parse(content?.parent || ""),
      onUpdate: ({ editor }) => console.log(editor.getJSON()),
      editorProps: {
        attributes: {
          class: "focus:outline-none mt-10 mx-10",
        },
      },
    },
    [content]
  );

  if (query?.status === "pending") {
    return <NotionEditorLoading />;
  }

  return <EditorContent editor={editor} />;
};
