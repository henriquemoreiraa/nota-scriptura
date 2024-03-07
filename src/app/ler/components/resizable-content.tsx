"use client";

import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { NotionPageHeader } from "./notion/notion-page-header";
import { NotionEditor } from "./notion/notion-editor";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { BibleEditor } from "./bible/bible-editor";

export const ResizableContent = () => {
  const pageQuery = useQuery({
    queryKey: ["notion-page"],
    queryFn: async () => {
      const response = await axios.get("/api/notion/pages");

      Promise.all([
        versesQuery.mutateAsync({
          book: response.data.properties.Abreviação.rich_text[0]?.text?.content,
        }),
        contentQuery.mutateAsync({ pageId: response.data.id }),
      ]);

      return response;
    },
    retry: false,
  });

  const versesQuery = useMutation({
    mutationFn: ({ book }: { book: string }) =>
      axios.get(`/api/bible/verses/nvi/${book}/1`),
    retry: false,
  });

  const contentQuery = useMutation({
    mutationFn: ({ pageId }: { pageId: string }) =>
      axios.get(`/api/notion/pages/${pageId}/contents/`),
    retry: false,
  });

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="h-[79vh]" style={{ overflow: "auto" }}>
        <BibleEditor query={versesQuery} />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        className="shadow-md h-[79vh]"
        style={{ overflow: "auto" }}
      >
        <NotionPageHeader query={pageQuery} />
        <NotionEditor query={contentQuery} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
