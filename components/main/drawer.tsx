import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import LanguageSwitcher from "../general/languageSwitcher";
import { Button } from "../ui/button";

const Drawer = ({ locale }: { locale: string }) => {
  return (
    <Sheet>
      <SheetTrigger asChild className="sm:hidden">
        <Button variant={"outline"} className="px-2 py-2 h-fit dark:bg-slate-700">
          <HiOutlineMenuAlt2 size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle className="text-left mt-3 flex justify-between">Menu</SheetTitle>
          <LanguageSwitcher width="w-full" locale={locale} />
          <div style={{ marginTop: "15px" }} className="gap-6 flex flex-col text-start">
            <SheetClose asChild>
              <Link className="underline text-blue-600" href={"/jsons"}>
                JSON files page
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link className="underline text-blue-600" href={"/admin"}>
                Admin page
              </Link>
            </SheetClose>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Drawer;
