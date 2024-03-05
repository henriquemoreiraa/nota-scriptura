"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { NotionPageHeader } from "./notion-page-header";
import { NotionEditor } from "./notion-editor";
import axios from "axios";

export const NotionPage = () => {
  const pageQuery = useQuery({
    queryKey: ["notion-page"],
    queryFn: async () => {
      const response = await axios.get("/api/notion/pages");

      contentQuery.mutateAsync(response.data.id);
      return response;
    },
    retry: 2,
  });

  const contentQuery = useMutation({
    mutationFn: (pageId) =>
      axios.get(`/api/notion/pages/contents/?page_id=${pageId}`),
    retry: 2,
  });

  return (
    <div>
      <NotionPageHeader query={pageQuery} />
      <NotionEditor query={contentQuery} />
    </div>
  );
};
