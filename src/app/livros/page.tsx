import NavBar from "@/components/navbar";
import BookChoiceOptions from "./components/book-choice-options";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

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
        <h1 className="text-center text-2xl font-bold">
          Seja bem-vindo, Henrique
        </h1>
        <p className="text-center mb-8">
          Antes de iniciar, vamos começar escolhendo um livro.
        </p>
        <div className="flex flex-row flex-wrap justify-center gap-8">
          <BookChoiceOptions />
        </div>
      </main>
    </>
  );
}

export default Page;
