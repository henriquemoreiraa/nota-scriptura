import Link from "next/link";
import Logo from "./icons/logo";

function NavBar() {
  return (
    <nav className="w-full p-4">
      <div className="flex gap-1 items-center">
        <Link href="/" aria-label="Ir para a página inicial">
          <Logo className="size-32 h-auto" />
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
