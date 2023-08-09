import { useTranslations } from "next-intl";
import Link from "next/link";
import LanguageSwitcher from "../general/languageSwitcher";
import ModeToggle from "../ui/themeToggle";
import Drawer from "./drawer";
import Profile from "./profile";

const Header = ({ locale }: { locale: string }) => {
  const t = useTranslations("Header");
  const UiTranslations = {
    jsonsLink: t("jsonsLink"),
    adminLink: t("adminLink"),
    menu: t("menu"),
    role: t("role"),
    changeRole: t("changeRole"),
    signOutBtn: t("signOutBtn"),
    signInBtn: t("signInBtn"),
    signInModalTitle: t("signInModalTitle"),
    signInGithub: t("signInGithub"),
    light: t("light"),
    dark: t("dark"),
    system: t("system"),
  };
  return (
    <div className="sticky z-50 top-0 bg-stone-400 dark:bg-stone-600 border-slate-200">
      <div className="container px-3 sm:px-4 justify-between flex items-center h-[60px]">
        <div className="flex gap-10">
          <Link href={"/"} className="text-red-600 text-xl font-mono">
            Tr_App
          </Link>
          <div className="gap-6 sm:flex items-center hidden">
            <Link className="underline text-blue-600" href={"/jsons"}>
              {UiTranslations.jsonsLink}
            </Link>
            <Link className="underline text-blue-600" href={"/admin"}>
              {UiTranslations.adminLink}
            </Link>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="sm:flex hidden gap-3 items-center">
            <LanguageSwitcher width="w-fit" locale={locale} />
          </div>
          <ModeToggle UiTranslations={UiTranslations} />
          <Drawer UiTranslations={UiTranslations} locale={locale} />
          <Profile UiTranslations={UiTranslations} />
        </div>
      </div>
    </div>
  );
};

export default Header;
