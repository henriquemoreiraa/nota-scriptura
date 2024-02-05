import Reading from "@/components/illustrations/reading";
import AuthGoogle from "./components/auth-google";

export default function Home() {
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
      <AuthGoogle />
      <Reading className="w-[450px] h-auto mt-12" />
    </div>
  );
}
