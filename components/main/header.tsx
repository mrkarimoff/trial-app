import Link from "next/link";
import LanguageSwitcher from "../general/languageSwitcher";
import ModeToggle from "../ui/themeToggle";

const Header = ({ locale }: { locale: string }) => {
  return (
    <div className="bg-stone-400 dark:bg-stone-600 border-slate-200">
      <div className="container px-3 sm:px-4 justify-between flex items-center h-[60px]">
        <Link href={"/"} className="text-red-600 text-xl font-mono">
          Tr_App
        </Link>
        <div className="gap-6 sm:flex items-center hidden">
          <Link className="underline text-blue-600" href={"/jsons"}>
            JSON files page
          </Link>
          <Link className="underline text-blue-600" href={"/admin"}>
            Admin page
          </Link>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <div className="sm:flex hidden gap-3 items-center">
          <LanguageSwitcher width="w-fit" locale={locale} />
        </div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
