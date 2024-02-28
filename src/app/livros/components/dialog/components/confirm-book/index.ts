import { ReactNode } from "react";
import { ConfirmBookError } from "./confirm-book-error";
import { ConfirmBookName } from "./confirm-book-name";
import { ConfirmBookRoot } from "./confirm-book-root";

export interface ConfirmBookProps {
  children?: ReactNode;
}

export const ConfirmBook = {
  Root: ConfirmBookRoot,
  Name: ConfirmBookName,
  Error: ConfirmBookError,
};
