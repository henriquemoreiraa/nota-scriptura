import Link from "next/link";
import { GitHubIcon } from "./icons/github";

function Footer() {
  return (
    <>
      <div className="w-[98vw] border-t border-zinc-200" />
      <footer className="w-full p-3 max-w-screen-xl flex justify-between">
        <p className="text-xs text-zinc-400">
          Copyright &copy; {new Date().getFullYear()} Nota Scriptura.
        </p>
        <Link
          target="_blank"
          href="https://github.com/henriquemoreiraa/nota-scriptura"
          aria-label="Ir para repositório no GitHub"
        >
          <GitHubIcon className="size-5 mr-1 fill-zinc-400" />
        </Link>
      </footer>
    </>
  );
}

export default Footer;
