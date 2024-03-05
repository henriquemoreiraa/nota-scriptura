"use client";

import { marked } from "marked";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { NotionPageContent } from "@/types/notion-pages";
import { useQueryClient } from "@tanstack/react-query";
import { NotionEditorLoading } from "./notion-editor-loading";

export const NotionEditor = () => {
  const queryClient = useQueryClient();
  const queryState = queryClient.getQueryState(["notion-page-content"]);
  const content = //@ts-ignore
  queryClient.getQueryData(["notion-page-content"])?.data as NotionPageContent;

  const editor = useEditor(
    {
      extensions: [StarterKit],
      content: marked.parse(content?.parent || ""),
      // onUpdate: ({ editor }) => console.log(editor.getJSON()),
      editorProps: {
        attributes: {
          class: "focus:outline-none mt-10 mx-10",
        },
      },
    },
    [content]
  );

  if (queryState?.status === "pending") {
    return <NotionEditorLoading />;
  }

  return <EditorContent editor={editor} />;
};
