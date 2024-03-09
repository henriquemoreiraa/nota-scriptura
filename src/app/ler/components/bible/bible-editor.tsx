"use client";

import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/react";
import { UseMutationResult, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { Bible } from "@/types/bible";
import { BibleEditorLoading } from "./bible-editor-loading";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NotionPageType } from "@/types/notion-pages";
import { editorClass } from "../constants";
import { useToast } from "@/hooks/use-toast";

interface BibleEditorProps {
  query: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    {
      book: string;
      chapter: number;
    },
    unknown
  >;
}

export const BibleEditor = ({ query }: BibleEditorProps) => {
  let bible: Bible = query.data?.data;

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const editor = useEditor(
    {
      extensions: [StarterKit],
      editable: false,
      content: bible?.verses
        .map((verse) => `<p><b>${verse.number}</b> ${verse.text}</p>`)
        .join(""),
      editorProps: {
        attributes: {
          class: `${editorClass} prose-strong:ml-5 prose-strong:text-xs prose-strong:relative prose-strong:bottom-[6px]`,
        },
      },
    },
    [bible]
  );

  const changeChapter = async ({ isNext }: { isNext: boolean }) => {
    const chapter = isNext
      ? bible.chapter.number + 1
      : bible.chapter.number - 1;
    const page: AxiosResponse<NotionPageType> | undefined =
      queryClient.getQueryData(["notion-page"]);

    try {
      queryClient.setQueryData(
        ["notion-page"],
        (
          axiosData: AxiosResponse<NotionPageType>
        ): AxiosResponse<NotionPageType> => {
          return {
            ...axiosData,
            data: {
              ...axiosData.data,
              properties: {
                ...axiosData.data.properties,
                Capítulo: {
                  number: chapter,
                  id: crypto.randomUUID(),
                  type: "number",
                },
              },
            },
          };
        }
      );

      await Promise.all([
        query.mutateAsync({
          book: bible.book.abbrev.pt,
          chapter,
        }),
        axios.patch(`/api/notion/pages/${page?.data.id}/properties/`, {
          properties: {
            Capítulo: {
              number: chapter,
            },
          },
        }),
      ]);
    } catch (error) {
      toast({
        title: "Houve um erro!",
        description: "Erro ao mudar o capítulo.",
      });
    }
  };

  if (query?.status === "pending" || query?.status === "idle") {
    return <BibleEditorLoading />;
  }

  return (
    <EditorContent className="flex flex-col" editor={editor}>
      <h4 className="text-sm px-10">
        {bible.book.name} {bible.chapter.number}
      </h4>
      <div className="w-full flex justify-between px-10 pt-10 order-3">
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
          data-chapter={bible.chapter.number + 1 === bible.book.chapters}
          className="data-[chapter=true]:invisible"
          onClick={() => changeChapter({ isNext: true })}
        >
          Capítulo {bible.chapter.number + 1} <ChevronRight />
        </Button>
      </div>
    </EditorContent>
  );
};
