import NavBar from "@/components/navbar";
import BookChoiceOptions from "./components/book-choice-options";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

function Page() {
  return (
    <main>
      <NavBar className="justify-end">
        <Avatar>
          <AvatarImage
            src="https://github.com/henriquemoreiraa.png"
            alt="henriquemoreiraa"
          />
          <AvatarFallback className="bg-transparent">
            <Skeleton className="h-12 w-12 rounded-full " />
          </AvatarFallback>
        </Avatar>
      </NavBar>
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
  );
}

export default Page;
