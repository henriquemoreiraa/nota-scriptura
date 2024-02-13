import { Suspense } from "react";
import { NotionIntegration } from "./components/notion/notion-integration";
import { ArrowRight } from "lucide-react";
import { SearchParamsProp } from "@/types/pages";
import Reading from "@/components/illustrations/reading";
import Link from "next/link";
import {
  NotionLink,
  NotionLinkPlaceHolder,
} from "./components/notion/notion-link";
import NavBar from "@/components/navbar";
import Logo from "@/components/icons/logo";

export default function Home({ searchParams }: SearchParamsProp) {
  return (
    <main className="flex flex-col items-center">
      <NavBar>
        <Logo className="size-32 h-auto" />
      </NavBar>
      <div className="mb-10">
        <h1 className="text-center text-5xl sm sm:text-7xl font-semibold tracking-tight mb-2">
          Leia, anote e estude <br /> a palavra
        </h1>
        <p className="text-lg text-center md:text-2xl font-medium">
          Nota Scriptura é uma Bíblia online integrada com o Notion. <br />
          Criada para facilitar suas anotações bíblicas.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-5 items-center">
        {searchParams.code ? (
          <Suspense fallback={<NotionLinkPlaceHolder />}>
            <NotionIntegration />
          </Suspense>
        ) : (
          <NotionLink />
        )}
        <Link
          href="/ler"
          className="flex items-center gap-1 font-normal text-link hover:underline hover:text-link-hover"
        >
          Quero apenas ler <ArrowRight className="size-4" />
        </Link>
      </div>
      <Reading className="max-w-[450px] w-full h-auto mt-12" />
    </main>
  );
}
