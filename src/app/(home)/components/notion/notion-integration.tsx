"use client";

import { useToastStatus } from "@/hooks/use-toast-status";
import { useQuery } from "@tanstack/react-query";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { NotionLinkPlaceHolder } from "./notion-link";
import axios, { AxiosError } from "axios";
import { useCustomSearchParams } from "@/hooks/use-set-search-params";

const getNotionAccessToken = async (
  router: AppRouterInstance,
  code: string | null
) => {
  try {
    const response = await axios.get(`/api/notion/access-token/?code=${code}`);
    router.push("/livros");

    return response;
  } catch (error) {
    router.push("/");

    if (error instanceof AxiosError) {
      throw new Error(error.response?.data);
    }
    if (typeof error === "string") {
      throw new Error(error);
    }
  }
};

export const NotionIntegration = () => {
  const { router, searchParams } = useCustomSearchParams();

  const { status, error } = useQuery({
    queryKey: ["notion-token-data"],
    queryFn: () => getNotionAccessToken(router, searchParams.get("code")),
    retry: false,
  });

  useToastStatus({
    status,
    pendingDescription: "Aguarde enquanto integramos ao Notion.",
    errorDescription:
      error?.message === "Template not provided"
        ? "Por favor, selecione a opção de modelo ao autorizar o acesso ao Notion."
        : "Erro ao tentar definir o token de acesso do Notion.",
    duration: status === "error" ? 10000 : 3000,
  });

  return <NotionLinkPlaceHolder />;
};
