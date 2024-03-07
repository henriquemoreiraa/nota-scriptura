import { Skeleton } from "@/components/ui/skeleton";

export const BibleEditorLoading = () => {
  return (
    <div className="mx-10 mt-10 flex gap-3 flex-col">
      <Skeleton className="h-2 mb-5 w-14 rounded-md" />
      <Skeleton className="h-4 w-[90%] self-end rounded-md" />
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-[50%] rounded-md" />
      <Skeleton className="h-4 w-[90%] self-end rounded-md" />
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-[40%] rounded-md" />
      <Skeleton className="h-4 w-[90%] self-end rounded-md" />
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-[70%] rounded-md" />
    </div>
  );
};
