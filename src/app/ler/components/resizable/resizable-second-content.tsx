import { ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { BibleEditor } from "../bible/bible-editor";
import { NotionLink } from "@/app/(home)/components/notion/notion-link";
import { BookSelect } from "../book/book-select";
import { useUserContext } from "@/context/user-context";

export const ResizableSecondContent = () => {
  const { user } = useUserContext();

  return (
    <>
      <ResizablePanel className="h-[79vh]" style={{ overflow: "auto" }}>
        <BibleEditor />
      </ResizablePanel>
      <ResizableHandle />

      <ResizablePanel
        className="shadow-md h-[79vh] flex flex-col items-center"
        style={{ overflow: "auto" }}
      >
        <BookSelect />
        {!user && (
          <div className="flex-1 flex justify-center items-center">
            <NotionLink />
          </div>
        )}
      </ResizablePanel>
    </>
  );
};
