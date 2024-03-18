"use client";

import { marked } from "marked";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { NotionPageContent } from "@/types/notion-pages";
import { UseMutationResult } from "@tanstack/react-query";
import { NotionEditorLoading } from "./notion-editor-loading";
import { AxiosResponse } from "axios";
import { editorClass } from "../constants";

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
      editorProps: {
        attributes: {
          class: editorClass,
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
