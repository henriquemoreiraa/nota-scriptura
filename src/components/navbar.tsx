import Logo from "./icons/logo";

function NavBar() {
  return (
    <nav className="w-full p-4">
      <div className="flex gap-1 items-center">
        <Logo className="size-32 h-auto" />
      </div>
    </nav>
  );
}

export default NavBar;
