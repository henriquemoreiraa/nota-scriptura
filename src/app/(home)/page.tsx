import Google from "@/components/icons/google";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-10">
        <h1 className="text-center text-5xl sm sm:text-6xl font-semibold tracking-tight mb-2">
          Leia e anote. <br /> Estude a palavra
        </h1>
        <p className="text-lg text-center md:text-xl font-medium">
          Nota Scriptura é uma Bíblia online integrada com o Notion. Facilitando
          suas anotações.
        </p>
      </div>
      <Button className="flex gap-2">
        <div className="bg-white p-1 rounded-full">
          <Google className="size-5" />
        </div>
        Continuar com o Google
      </Button>
    </div>
  );
}
