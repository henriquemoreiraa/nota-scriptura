import NotionIcon from "@/components/icons/notion";
import { AnchorLinkButton } from "@/components/ui/link-button";
import { Loader2 } from "lucide-react";

export const NotionLink = () => {
  const authUrl = process.env.NOTION_AUTH_URL;

  return (
    <AnchorLinkButton
      data-testid="notion-link"
      href={authUrl}
      className="flex gap-2"
    >
      <div className="bg-white p-1 rounded-full">
        <NotionIcon className="size-5" />
      </div>
      Integrar com o Notion
    </AnchorLinkButton>
  );
};

export function NotionLinkPlaceHolder() {
  return (
    <AnchorLinkButton
      data-testid="notion-link-placeholder"
      aria-disabled
      className="flex gap-2 relative"
    >
      <Loader2 className="size-4 animate-spin" />
      Integrar com o Notion
    </AnchorLinkButton>
  );
}
