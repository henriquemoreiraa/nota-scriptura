import { NotionPageHeader } from "../notion/notion-page-header";
import { NotionEditor } from "../notion/notion-editor";
import { ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { BibleEditor } from "../bible/bible-editor";
import { useBible } from "@/hooks/use-bible";
import { NotionPageType } from "@/types/notion-pages";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export const ResizableFirstContent = () => {
  const { versesQuery } = useBible();

  const pageQuery = useQuery({
    queryKey: ["notion-page"],
    queryFn: async () => {
      const response: AxiosResponse<NotionPageType> = await axios.get(
        "/api/notion/pages"
      );

      Promise.all([
        versesQuery?.mutateAsync({
          book: response.data.properties.Abreviação.rich_text[0]?.text?.content,
          chapter: response.data.properties.Capítulo.number,
          highlighted:
            response.data.properties["Versículos Marcados"]?.rich_text[0]?.text
              ?.content,
        }),
        contentQuery.mutateAsync({ pageId: response.data.id }),
      ]);

      return response;
    },
    retry: false,
  });

  const contentQuery = useMutation({
    mutationFn: ({ pageId }: { pageId: string }) =>
      axios.get(`/api/notion/pages/${pageId}/contents/`),
    retry: false,
  });

  return (
    <>
      <ResizablePanel className="h-[79vh]" style={{ overflow: "auto" }}>
        <BibleEditor />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        className="shadow-md h-[79vh]"
        style={{ overflow: "auto" }}
      >
        <NotionPageHeader query={pageQuery} />
        <NotionEditor query={contentQuery} />
      </ResizablePanel>
    </>
  );
};
