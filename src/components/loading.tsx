import { Loader2 } from "lucide-react";
import { twMerge } from "tailwind-merge";

export const Loading = ({ className }: { className?: string }) => {
  return (
    <div
      data-testid="loading"
      className="flex justify-center items-center w-full"
    >
      <Loader2
        className={twMerge("size-4 animate-spin text-zinc-400", className)}
      />
    </div>
  );
};
