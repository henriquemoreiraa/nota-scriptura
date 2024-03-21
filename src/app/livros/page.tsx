import NavBar from "@/components/navbar";
import { BookChoiceOptions } from "./components/book-choice-options";
import { Suspense } from "react";
import { NotionUserName } from "./components/notion-user-name";
import { UserContextProvider } from "@/context/user-context";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function Page() {
  return (
    <UserContextProvider>
      <NavBar />
      <main>
        <h1 className="text-2xl font-bold flex items-center justify-center gap-1">
          Seja bem-vindo
          <NotionUserName />
        </h1>
        <p className="text-center mb-8">
          Antes de iniciar, vamos começar escolhendo um livro.
        </p>
        <div className="flex flex-row flex-wrap justify-center gap-8">
          <Suspense>
            <BookChoiceOptions />
          </Suspense>
        </div>
        <div className="flex justify-center mt-10 mb-6">
          <Link
            href="/ler"
            className="flex items-center gap-1 font-normal text-link hover:underline hover:text-link-hover"
          >
            Continuar do último livro lido <ArrowRight className="size-4" />
          </Link>
        </div>
      </main>
    </UserContextProvider>
  );
}

export default Page;
