import Link from "next/link";
import ModeToggle from "../ui/themeToggle";

const Header = () => {
  return (
    <div className="bg-stone-400 dark:bg-stone-600 border-slate-200">
      <div className="container px-3 sm:px-4 justify-between flex items-center h-[60px]">
        <Link href={"/"} className="text-red-600 text-xl font-mono">
          T_App
        </Link>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
