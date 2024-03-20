import { Skeleton } from "@/components/ui/skeleton";

export const BookSelectLoading = () => {
  return (
    <div className="w-full p-4 pl-6">
      <Skeleton className="h-12 mb-5 w-full rounded-md" />
      <Skeleton className="h-10 mb-5 w-full rounded-md" />
      <Skeleton className="h-10 mb-5 w-full rounded-md" />
    </div>
  );
};
