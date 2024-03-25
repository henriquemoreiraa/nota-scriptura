import { useBibleContext } from "@/context/bible-context";
import { NotionPageType } from "@/types/notion-pages";
import axios, { AxiosResponse } from "axios";
import { useToast } from "./use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Bible, SelectedVerseType } from "@/types/bible";
import { useState } from "react";
import { useCustomSearchParams } from "./use-set-search-params";
import { Book } from "@/types/books";

export const useBible = () => {
  const [selectedVerses, setSelectedVerses] = useState<SelectedVerseType[]>([]);

  const { toast } = useToast();
  const { versesQuery, verses, bookQuery } = useBibleContext();
  const { createSearchParams } = useCustomSearchParams();

  const queryClient = useQueryClient();

  const bible: Bible = versesQuery?.data?.data;
  const book: Book = bookQuery?.data?.data;

  const changeChapter = async ({ isNext }: { isNext: boolean }) => {
    const page: AxiosResponse<NotionPageType> | undefined =
      queryClient.getQueryData(["notion-page"]);

    const chapter = isNext
      ? bible.chapter.number + 1
      : bible.chapter.number - 1;

    try {
      if (page) {
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
        await axios.patch(`/api/notion/pages/${page?.data.id}/properties/`, {
          properties: {
            Capítulo: {
              number: chapter,
            },
          },
        });
      } else {
        localStorage.setItem("chapter", chapter.toString());
        createSearchParams("chapter", chapter.toString());
      }

      await versesQuery?.mutateAsync({
        book: bible.book.abbrev.pt,
        highlighted:
          page?.data.properties["Versículos Marcados"]?.rich_text[0]?.text
            ?.content,
        chapter,
      });
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
    book,
    bible,
    verses,
    selectedVerses,
    setSelectedVerses,
    changeChapter,
  };
};
