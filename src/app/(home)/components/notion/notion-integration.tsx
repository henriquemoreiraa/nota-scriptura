"use client";

import { useToastStatus } from "@/hooks/use-toast-status";
import { useQuery } from "@tanstack/react-query";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { NotionLink, NotionLinkPlaceHolder } from "./notion-link";
import axios, { AxiosError } from "axios";

const getNotionAccessToken = async (
  router: AppRouterInstance,
  code: string | null
) => {
  try {
    const response = await axios.get(`/api/notion/access-token/?code=${code}`);
    router.push("/ler");

    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }
    throw new Error("Something went wrong!");
  }
};

export const NotionIntegration = () => {
  const router = useRouter();
  const code = useSearchParams().get("code");

  const { status } = useQuery({
    queryKey: ["notion-token-data"],
    queryFn: () => getNotionAccessToken(router, code),
  });

  useToastStatus({
    status,
    pendingDescription: "Aguarde enquanto integramos ao Notion.",
    errorDescription: "Erro ao tentar definir o token de acesso do Notion.",
  });

  return status === "pending" ? <NotionLinkPlaceHolder /> : <NotionLink />;
};
