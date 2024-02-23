import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

interface AnchorLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {}

interface NextLinkProps extends LinkProps, VariantProps<typeof buttonVariants> {
  className?: string;
  children: ReactNode;
}

const AnchorLinkButton = ({
  className,
  variant,
  size,
  ...props
}: AnchorLinkProps) => {
  return (
    <a
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};

const NextLinkButton = ({
  className,
  variant,
  size,
  ...props
}: NextLinkProps) => {
  return (
    <Link
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export { AnchorLinkButton, NextLinkButton };
