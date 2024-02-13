import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

function NavBar({ children, className, ...props }: ComponentProps<"div">) {
  return (
    <nav className="w-full p-4 pt-0 pl-0">
      <div className={twMerge("flex gap-1 items-center", className)} {...props}>
        {children}
      </div>
    </nav>
  );
}

export default NavBar;
