import { AlignLeft, Clock9, HashIcon } from "lucide-react";

type PagePropertiesType = {
  [key: string]: {
    icon: JSX.Element;
  };
};

export const pageProperties: PagePropertiesType = {
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

export const editorClass =
  "focus:outline-none mt-10 mx-10 prose dark:prose-invert prose-headings:my-1 prose-p:my-0 prose-headings:text-zinc-800 marker:text-zinc-800";
