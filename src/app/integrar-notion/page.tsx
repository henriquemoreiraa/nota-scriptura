"use client";

import NotionIcon from "@/components/icons/notion";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

interface SearchParamsProp {
  searchParams: { [key: string]: string | undefined };
}

const getNotionAccessToken = async (
  router: AppRouterInstance,
  code?: string
) => {
  if (code) {
    await fetch(`/api/notion/get-access-token/?code=${code}`);
    router.push("/ler");
  }
  return null;
};

function Page({ searchParams }: SearchParamsProp) {
  const router = useRouter();

  const { status } = useQuery({
    queryKey: ["notion-token-data"],
    queryFn: () => getNotionAccessToken(router, searchParams.code),
  });

  if (status === "error") {
    // TODO: handle error
  }

  if (status === "pending") {
    // TODO: handle loading
  }

  return (
    <div>
      <Button type="submit" className="flex gap-2">
        <div className="bg-white p-1 rounded-full">
          <NotionIcon className="size-5" />
        </div>
        Integrar com o Notion
      </Button>
    </div>
  );
}

export default Page;
