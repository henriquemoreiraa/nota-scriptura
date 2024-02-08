"use client";

import NotionIcon from "@/components/icons/notion";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const getNotionAccessToken = async (
  router: AppRouterInstance,
  code: string | null
) => {
  if (code) {
    await fetch(`/api/notion/get-access-token/?code=${code}`).then(() => {
      router.push("/ler");
    });
  }
  return null;
};

function NotionIntegration() {
  const router = useRouter();
  const code = useSearchParams().get("code");

  const { status } = useQuery({
    queryKey: ["notion-token-data"],
    queryFn: () => getNotionAccessToken(router, code),
  });

  if (status === "error") {
    // TODO: handle error
  }

  if (status === "pending") {
    // TODO: handle loading
  }

  return (
    <Button type="submit" className="flex gap-2">
      <div className="bg-white p-1 rounded-full">
        <NotionIcon className="size-5" />
      </div>
      Integrar com o Notion
    </Button>
  );
}

export default NotionIntegration;

export function NotionIntegrationPlaceHolder() {
  return (
    <Button disabled type="submit" className="flex gap-2 relative">
      <Loader2 className="size-4 animate-spin" />
      Integrar com o Notion
    </Button>
  );
}
