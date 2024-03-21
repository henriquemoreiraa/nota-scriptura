import NavBar from "@/components/navbar";
import { ResizableGroup } from "./components/resizable/resizable-group";
import { NavBarButtons } from "./components/navbar-buttons";
import { UserContextProvider } from "@/context/user-context";
import { Suspense } from "react";

function Page() {
  return (
    <UserContextProvider>
      <Suspense>
        <NavBar>
          <NavBarButtons />
        </NavBar>
        <main>
          <ResizableGroup />
        </main>
      </Suspense>
    </UserContextProvider>
  );
}

export default Page;
