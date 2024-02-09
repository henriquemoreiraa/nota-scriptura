"use client";

import { useToastStatus } from "@/hooks/use-toast-status";
import { useQuery } from "@tanstack/react-query";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { NotionLink, NotionLinkPlaceHolder } from "./notion-link";

const getNotionAccessToken = async (
  router: AppRouterInstance,
  code: string | null
) => {
  const response = await fetch(`/api/notion/access-token/?code=${code}`);
  if (response.status === 200) {
    router.push("/ler");
    return response;
  }

  throw new Error("Could not set access token!");
};

export const NotionIntegration = () => {
  const router = useRouter();
  const code = useSearchParams().get("code");

  const { status } = useQuery({
    queryKey: ["notion-token-data"],
    queryFn: () => getNotionAccessToken(router, code),
    retry: 2,
  });

  const toastConfig = useMemo(
    () => ({
      pendingDescription: "Aguarde enquanto integramos ao Notion.",
      errorDescription: "Erro ao tentar definir o token de acesso do Notion.",
    }),
    []
  );

  useToastStatus({
    status,
    ...toastConfig,
  });

  return status === "pending" ? <NotionLinkPlaceHolder /> : <NotionLink />;
};
