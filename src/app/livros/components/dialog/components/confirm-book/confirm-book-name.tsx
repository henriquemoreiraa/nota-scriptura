import { ConfirmBookProps } from ".";

export const ConfirmBookName = ({ children }: ConfirmBookProps) => {
  return (
    <div className="text-center">
      <h1 className="text-xl font-medium">Seu livro escolhido é:</h1>
      <p className="text-3xl font-bold mt-2">{children}</p>
    </div>
  );
};
