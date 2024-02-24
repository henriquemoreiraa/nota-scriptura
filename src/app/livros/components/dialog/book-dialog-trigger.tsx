"use client";

import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { useCustomSearchParams } from "@/hooks/use-set-search-params";
import { ReactNode } from "react";

export const BookDialogTrigger = ({ children }: { children: ReactNode }) => {
  const { deleteSearchParams } = useCustomSearchParams();

  return (
    <DialogTrigger asChild onClick={() => deleteSearchParams()}>
      <Button
        variant="secondary"
        className="w-full group-hover:bg-blue-500 group-hover:text-white group-hover:font-semibold transition-all duration-200"
      >
        {children}
      </Button>
    </DialogTrigger>
  );
};
