"use client";

import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import Logo from "./icons/logo";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { useUserContext } from "@/context/user-context";

function NavBar({ children, className, ...props }: ComponentProps<"div">) {
  const { user, status } = useUserContext();

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
        <div className="flex items-center gap-3">
          {children}
          {status !== "error" && (
            <Avatar className="size-9">
              <AvatarImage
                src={user?.avatar_url as string}
                alt="henriquemoreiraa"
              />
              <AvatarFallback className="bg-transparent">
                <Skeleton className="h-full w-full rounded-full " />
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
