"use client";

import { DialogOverlay } from "@radix-ui/react-dialog";
import { ReactNode } from "react";

const DialogOverlayCustom = ({ children }: { children: ReactNode }) => {
  return (
    <DialogOverlay className="relative z-0 bg-transparent w-full flex flex-col gap-3">
      {children}
    </DialogOverlay>
  );
};

export default DialogOverlayCustom;
