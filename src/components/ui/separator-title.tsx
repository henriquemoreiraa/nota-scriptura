import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface SeparatorTitleProps extends ComponentProps<"h2"> {}

export const SeparatorTitle = ({
  children,
  className,
  ...props
}: SeparatorTitleProps) => {
  return (
    <h2
      className={twMerge(
        "w-full flex items-center gap-5 font-medium text-sm after:w-full after:border-t after:border-zinc-200 after:box-content after:inline-flex",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
};
