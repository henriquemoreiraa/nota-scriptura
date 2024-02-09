import { useEffect } from "react";
import { Toast, useToast } from "./use-toast";

interface useToastEffectProps extends Toast {
  status: "error" | "success" | "pending";
  pendingDescription: string;
  errorDescription: string;
}

function useToastStatus({
  status,
  pendingDescription = "",
  errorDescription = "",
  ...props
}: useToastEffectProps) {
  const { toast } = useToast();

  useEffect(() => {
    if (status === "pending") {
      toast({
        title: "Aguarde um momento!",
        description: pendingDescription,
        ...props,
      });
    }
    if (status === "error") {
      toast({
        title: "Houve um erro!",
        description: errorDescription,
        ...props,
        variant: "destructive",
      });
    }
  }, [status]);
}

export { useToastStatus };
