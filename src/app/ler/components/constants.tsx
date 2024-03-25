import { AlignLeft, Clock9, HashIcon } from "lucide-react";

export const editorClass =
  "focus:outline-none sm:mt-10 sm:mx-10 mt-5 mx-5 prose dark:prose-invert prose-headings:my-1 prose-p:my-0 prose-headings:text-zinc-800 marker:text-zinc-800 text-zinc-800";

export const pageProperties: {
  [key: string]: {
    icon: JSX.Element;
  };
} = {
  Abreviação: {
    icon: <AlignLeft className="size-4" />,
  },
  "Hora da última edição": {
    icon: <Clock9 className="size-4" />,
  },
  Capítulo: {
    icon: <HashIcon className="size-4" />,
  },
};

export const colors: { [key: string]: string } = {
  r: "bg-red-500",
  g: "bg-green-500",
  y: "bg-yellow-400",
  b: "bg-blue-500",
};
