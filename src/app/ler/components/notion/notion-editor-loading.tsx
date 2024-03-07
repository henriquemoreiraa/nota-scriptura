import { Skeleton } from "@/components/ui/skeleton";

export const NotionEditorLoading = () => {
  return (
    <div className="mx-10 mt-10 flex gap-3 flex-col">
      <Skeleton className="h-6 w-28 rounded-md" />
      <Skeleton className="h-4 w-full rounded-md" />
    </div>
  );
};
