import { Dices, Pointer, TreeDeciduous } from "lucide-react";
import ChooseBookDialog from "./choose-book-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

const BookChoiceOptions = () => {
  const options = [
    {
      icon: <TreeDeciduous className="size-12" />,
      title: "Começar do começo (Gênesis)",
      description:
        "Prepare-se para voltar às origens! Pressione este botão para começar sua jornada bíblica desde o início dos tempos, onde tudo começou. Do Éden às grandes histórias de fé, o Gênesis é o ponto de partida para uma aventura espiritual inesquecível!",
      button: {
        title: "Começo",
        dialog: <ChooseBookDialog />,
      },
    },
    {
      icon: <Pointer className="size-12" />,
      title: "Escolher um livro",
      description:
        "Seletor de livros ativado! Escolha sabiamente, como se estivesse escolhendo seu próximo livro de cabeceira. Navegue, explore e selecione o livro que mais combina com o seu humor espiritual, curiosidade bíblica ou oque você sentir certo!",
      button: {
        title: "Escolher",
        dialog: <ChooseBookDialog />,
      },
    },
    {
      icon: <Dices className="size-12" />,
      title: "Livro aleatório",
      description:
        "Vamos adicionar um pouco de emoção bíblica à sua vida! Pressione o botão 'Aleatório' e deixe a sorte (ou providência divina?) decidir qual parte da Bíblia você irá explorar hoje. Quem sabe que tesouros espirituais você encontrará nesta aventura aleatória!",
      button: {
        title: "Aleatório",
        dialog: <ChooseBookDialog />,
      },
    },
  ];

  return options.map((option) => (
    <div
      key={option.title}
      className="border-2 border-zinc-200 rounded-xl p-5 max-w-[320px] min-h-[380px] text-center flex flex-col justify-between items-center  hover:border-blue-500 transition-all duration-200 group"
    >
      <div>{option.icon}</div>
      <div>
        <h2 className="font-bold text-lg mb-3">{option.title}</h2>
        <p className="text-sm text-zinc-600">{option.description}</p>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            className="w-full group-hover:bg-blue-500 group-hover:text-white group-hover:font-semibold transition-all duration-200"
          >
            {option.button.title}
          </Button>
        </DialogTrigger>
        {option.button.dialog}
      </Dialog>
    </div>
  ));
};

export default BookChoiceOptions;
