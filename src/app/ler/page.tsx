import NavBar from "@/components/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ResizableGroup } from "./components/resizable/resizable-group";
import { NavBarButtons } from "./components/navbar-buttons";

function Page() {
  return (
    <>
      <NavBar>
        <div className="flex items-center gap-3">
          <NavBarButtons />
          <Avatar className="size-9">
            <AvatarImage
              src="https://github.com/henriquemoreiraa.png"
              alt="henriquemoreiraa"
            />
            <AvatarFallback className="bg-transparent">
              <Skeleton className="h-full w-full rounded-full " />
            </AvatarFallback>
          </Avatar>
        </div>
      </NavBar>
      <main>
        <ResizableGroup />
      </main>
    </>
  );
}

export default Page;
