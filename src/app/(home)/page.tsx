import Reading from "@/components/illustrations/reading";
import AuthGoogle from "./components/auth-google";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const nextAuthToken = cookies().get("next-auth.session-token");

  if (nextAuthToken) {
    const notionToken = cookies().get("notion-token");

    if (notionToken) {
      redirect("/ler");
    }
    redirect("/integrar-notion");
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-10">
        <h1 className="text-center text-5xl sm sm:text-7xl font-semibold tracking-tight mb-2">
          Leia, anote e estude <br /> a palavra
        </h1>
        <p className="text-lg text-center md:text-2xl font-medium">
          Nota Scriptura é uma Bíblia online integrada com o Notion. <br />
          Criada para facilitar suas anotações bíblicas.
        </p>
      </div>
      <div className="flex gap-5 items-center">
        <AuthGoogle />
        <Link
          href="#"
          className="flex items-center gap-1 font-normal text-link hover:underline hover:text-link-hover"
        >
          Quero apenas ler <ArrowRight className="size-4" />
        </Link>
      </div>
      <Reading className="max-w-[450px] w-full h-auto mt-12" />
    </div>
  );
}
