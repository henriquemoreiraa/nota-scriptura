"use client";

import { ResizablePanelGroup } from "@/components/ui/resizable";
import { useCustomSearchParams } from "@/hooks/use-set-search-params";
import { ResizableFirstContent } from "./resizable-first-content";
import { ResizableSecondContent } from "./resizable-second-content";
import { BibleContextProvider } from "@/context/bible-context";
import { BookContextProvider } from "@/context/book-context";

export const ResizableGroup = () => {
  const { searchParams } = useCustomSearchParams();

  return (
    <BibleContextProvider>
      <ResizablePanelGroup direction="horizontal">
        {!searchParams.get("book") && <ResizableFirstContent />}
        {searchParams.get("book") && (
          <BookContextProvider>
            <ResizableSecondContent />
          </BookContextProvider>
        )}
      </ResizablePanelGroup>
    </BibleContextProvider>
  );
};
