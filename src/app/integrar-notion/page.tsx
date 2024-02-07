"use client";

import NotionIcon from "@/components/icons/notion";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useSearchParams, useRouter } from "next/navigation";

const getNotionAccessToken = async (
  code: string | null,
  router: AppRouterInstance
) => {
  if (code) {
    await fetch(
      `${process.env.NEXTAUTH_URL}api/notion/get-access-token/?code=${code}`
    );
    router.push("/ler");
  }
  return null;
};

function Page() {
  const code = useSearchParams().get("code");
  const router = useRouter();

  const { status } = useQuery({
    queryKey: ["notion-token-data"],
    queryFn: () => getNotionAccessToken(code, router),
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
