"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { NextLinkButton } from "@/components/ui/link-button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUserContext } from "@/context/user-context";
import { useCustomSearchParams } from "@/hooks/use-set-search-params";
import { BookOpen, BookPlus } from "lucide-react";

export const NavBarButtons = () => {
  const { createSearchParams, searchParams, router } = useCustomSearchParams();
  const { user, status } = useUserContext();

  return (
    <>
      <div className="flex">
        <TooltipProvider>
          {!searchParams.get("book") && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="flex items-center gap-1"
                  variant="ghost"
                  onClick={() => createSearchParams("book", "gn")}
                >
                  <BookOpen size={22} className="text-zinc-800" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ler livremente</p>
              </TooltipContent>
            </Tooltip>
          )}
          {user && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => router.push("/livros")}
                  className="flex items-center gap-1"
                  variant="ghost"
                >
                  <BookPlus size={22} className="text-zinc-800" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Iniciar novo livro</p>
              </TooltipContent>
            </Tooltip>
          )}
        </TooltipProvider>
      </div>
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
    </>
  );
};
