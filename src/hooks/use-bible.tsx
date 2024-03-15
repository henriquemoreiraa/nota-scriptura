import { useBibleContext } from "@/context/bible-context";
import { NotionPageType } from "@/types/notion-pages";
import axios, { AxiosResponse } from "axios";
import { useToast } from "./use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Bible, SelectedVerseType } from "@/types/bible";
import { useState } from "react";

export const useBible = () => {
  const [selectedVerses, setSelectedVerses] = useState<SelectedVerseType[]>([]);

  const { toast } = useToast();
  const { versesQuery, verses } = useBibleContext();

  const queryClient = useQueryClient();

  const bible: Bible = versesQuery?.data?.data;

  const changeChapter = async ({ isNext }: { isNext: boolean }) => {
    const page: AxiosResponse<NotionPageType> | undefined =
      queryClient.getQueryData(["notion-page"]);

    const chapter = isNext
      ? bible.chapter.number + 1
      : bible.chapter.number - 1;

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
        versesQuery?.mutateAsync({
          book: bible.book.abbrev.pt,
          highlighted:
            page?.data.properties["Versículos Marcados"].rich_text[0]?.text
              ?.content,
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
        variant: "destructive",
      });
    }
  };

  return {
    versesQuery,
    bible,
    verses,
    selectedVerses,
    setSelectedVerses,
    changeChapter,
  };
};
