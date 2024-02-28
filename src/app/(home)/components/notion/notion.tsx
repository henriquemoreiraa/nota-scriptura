"use client";

import { NotionLink } from "./notion-link";
import { NotionIntegration } from "./notion-integration";
import { useCustomSearchParams } from "@/hooks/use-set-search-params";

export const Notion = () => {
  const { searchParams } = useCustomSearchParams();

  return searchParams.get("code") ? <NotionIntegration /> : <NotionLink />;
};
