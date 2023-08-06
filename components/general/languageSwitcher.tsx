"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next-intl/client";

interface LanguageSwitcherProps {
  locale: string;
  width: string;
}

const LanguageSwitcher = ({ locale, width }: LanguageSwitcherProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Select onValueChange={(val) => router.push(pathname, { locale: val })}>
      <SelectTrigger className={`dark:bg-slate-700 bg-white ${width} space-x-1 text-xs sm:text-sm`}>
        <SelectValue placeholder={locale === "en" ? "English" : "Russian"} />
      </SelectTrigger>
      <SelectContent className="dark:bg-slate-700 bg-white">
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="ru">Russian</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;