import { XCircle } from "lucide-react";
import { ConfirmBookProps } from ".";

export const ConfirmBookError = ({ children }: ConfirmBookProps) => {
  return (
    <div className="text-center">
      <h1 className="text-lg font-semibold flex items-center justify-center gap-2">
        <XCircle className="text-red-500 size-5" /> Houve um erro!
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">{children}</p>
    </div>
  );
};
