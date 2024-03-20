import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import Logo from "./icons/logo";

function NavBar({ children, className, ...props }: ComponentProps<"div">) {
  return (
    <nav className="w-full p-4 pt-0 pl-0">
      <div
        className={twMerge(
          "flex gap-1 items-center justify-between",
          className
        )}
        {...props}
      >
        <Logo className="size-32 h-auto" />
        {children}
      </div>
    </nav>
  );
}

export default NavBar;
