import NotionIcon from "@/components/icons/notion";
import { LinkButton } from "@/components/ui/link-button";
import { Loader2 } from "lucide-react";

export const NotionLink = () => {
  return (
    <LinkButton data-testid="notion-link" href="/ler" className="flex gap-2">
      <div className="bg-white p-1 rounded-full">
        <NotionIcon className="size-5" />
      </div>
      Integrar com o Notion
    </LinkButton>
  );
};

export function NotionLinkPlaceHolder() {
  return (
    <LinkButton
      data-testid="notion-link-placeholder"
      aria-disabled
      className="flex gap-2 relative"
    >
      <Loader2 className="size-4 animate-spin" />
      Integrar com o Notion
    </LinkButton>
  );
}
