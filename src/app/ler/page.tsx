import NavBar from "@/components/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ResizablePanelGroup,
  ResizableHandle,
  ResizablePanel,
} from "@/components/ui/resizable";
import { NotionPage } from "./components/notion-page";

function Page() {
  return (
    <>
      <NavBar className="justify-end">
        <Avatar className="size-9">
          <AvatarImage
            src="https://github.com/henriquemoreiraa.png"
            alt="henriquemoreiraa"
          />
          <AvatarFallback className="bg-transparent">
            <Skeleton className="h-full w-full rounded-full " />
          </AvatarFallback>
        </Avatar>
      </NavBar>
      <main>
        <div className="flex justify-between">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel>One</ResizablePanel>
            <ResizableHandle />
            <ResizablePanel className="shadow-md">
              <NotionPage />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </main>
    </>
  );
}

export default Page;
