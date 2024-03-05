"use client";

import { useQueries } from "@tanstack/react-query";
import { NotionPageHeader } from "./notion-page-header";
import { NotionEditor } from "./notion-editor";
import axios from "axios";

export const NotionPage = () => {
  useQueries({
    queries: [
      {
        queryKey: ["notion-page"],
        queryFn: () => axios.get("/api/notion/pages"),
        retry: 2,
      },
      {
        queryKey: ["notion-page-content"],
        queryFn: () => axios.get("/api/notion/pages/contents"),
        retry: 2,
      },
    ],
  });

  return (
    <div>
      <NotionPageHeader />
      <NotionEditor />
    </div>
  );
};
