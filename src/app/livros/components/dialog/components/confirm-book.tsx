import { DialogHeader } from "@/components/ui/dialog";
import { ReactNode } from "react";

export const ConfirmBook = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <DialogHeader>
        <h1 className="text-xl font-medium">Seu próximo livro é:</h1>
      </DialogHeader>
      {children}
    </div>
  );
};
