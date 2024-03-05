import { Skeleton } from "@/components/ui/skeleton";

export const NotionPageHeaderLoading = () => {
  return (
    <>
      <div className="w-full h-[20vh] relative mb-5">
        <Skeleton className="h-full w-full object-cover object-center rounded-none" />
      </div>
      <div>
        <h1 className="flex items-center gap-3 mx-10">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-6 w-60 rounded-md" />
        </h1>
      </div>
    </>
  );
};
