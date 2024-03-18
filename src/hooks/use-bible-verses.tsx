import { useBibleContext } from "@/context/bible-context";
import { NotionPageType } from "@/types/notion-pages";
import axios, { AxiosResponse } from "axios";
import { useToast } from "./use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { BibleVerseProps } from "@/app/ler/components/bible/bible-verse";
import {
  formatVerseToProperty,
  formatVerseToContent,
  highlightVerses,
} from "@/app/ler/utils/verses";

export const useBibleVerses = ({
  selectedVerses,
  setSelectedVerses,
  verse,
}: BibleVerseProps) => {
  const { setVerses } = useBibleContext();
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const isVerseSelected =
    selectedVerses.find((v) => v.number === verse.number)?.color || verse.color;

  const handleSelectVerse = () => {
    if (isVerseSelected) {
      const filtered = selectedVerses.filter((v) => v.number !== verse.number);
      setSelectedVerses(filtered);
      return;
    }
    setSelectedVerses((prev) => [...prev, { ...verse, color: "" }]);
  };

  const handleHighlightVerse = (color: string) => {
    const newSelectedVerses = selectedVerses.map((verse) => ({
      ...verse,
      color,
    }));
    setSelectedVerses(newSelectedVerses);
  };

  const handleSaveHighlightedVerses = async ({
    noteVerse,
  }: {
    noteVerse: boolean;
  }) => {
    const page: AxiosResponse<NotionPageType> | undefined =
      queryClient.getQueryData(["notion-page"]);

    const verseToProperty = `${
      page?.data?.properties?.["Versículos Marcados"]?.rich_text[0]?.text
        .content || ""
    } ${formatVerseToProperty({
      verses: selectedVerses,
      chapter: verse.chapter,
    })}`;

    try {
      toast({
        title: "Carregando, aguarde.",
      });

      axios.patch(`/api/notion/pages/${page?.data.id}/properties/`, {
        properties: {
          "Versículos Marcados": {
            rich_text: [
              {
                text: {
                  content: verseToProperty,
                },
              },
            ],
          },
        },
      });

      if (noteVerse) {
        await axios.patch(`/api/notion/pages/${page?.data.id}/contents/`, {
          blocks: [
            {
              paragraph: {
                rich_text: [
                  {
                    text: {
                      content: "",
                    },
                  },
                ],
              },
            },
            {
              heading_3: {
                rich_text: [
                  {
                    text: {
                      content: formatVerseToContent({
                        verses: selectedVerses,
                        chapter: verse.chapter,
                      }),
                    },
                  },
                ],
              },
            },
          ],
        });

        window.open(page?.data.url, "_blank");
      } else {
        setVerses((prev) =>
          highlightVerses({
            highlighted: verseToProperty,
            verses: prev,
            chapter: verse.chapter,
          })
        );
      }

      setSelectedVerses([]);
    } catch (error) {
      toast({
        title: "Houve um erro!",
        description: "Erro ao salvar versículos marcados.",
        variant: "destructive",
      });
    }
  };

  return {
    handleSelectVerse,
    handleHighlightVerse,
    handleSaveHighlightedVerses,
    isVerseSelected,
  };
};
