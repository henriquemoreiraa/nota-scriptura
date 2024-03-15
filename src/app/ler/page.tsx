import NavBar from "@/components/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ResizableContent } from "./components/resizable-content";
import { BibleContextProvider } from "@/context/bible-context";

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
          <BibleContextProvider>
            <ResizableContent />
          </BibleContextProvider>
        </div>
      </main>
    </>
  );
}

export default Page;
