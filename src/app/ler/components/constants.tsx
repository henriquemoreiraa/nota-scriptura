import { AlignLeft, Clock9 } from "lucide-react";

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
};
