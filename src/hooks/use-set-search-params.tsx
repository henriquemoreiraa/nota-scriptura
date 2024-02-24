import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useCustomSearchParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentSearchParams = new URLSearchParams(searchParams);

  const pushSearchParams = (newSearchParams: string) => {
    return router.push(`${pathname}?${newSearchParams}`);
  };

  const createSearchParams = (name: string, value: string) => {
    currentSearchParams.set(name, value);

    return pushSearchParams(currentSearchParams.toString());
  };

  const deleteSearchParams = (queryName?: string) => {
    if (queryName) {
      currentSearchParams.delete(queryName);
      return pushSearchParams(currentSearchParams.toString());
    }

    return pushSearchParams("");
  };

  return {
    createSearchParams,
    pushSearchParams,
    deleteSearchParams,
    searchParams,
    router,
  };
};
