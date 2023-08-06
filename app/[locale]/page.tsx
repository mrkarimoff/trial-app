import { useTranslations } from "next-intl";

export default async function Home() {
  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("Index");
  return (
    <div>
      <h1 className="dark:text-red-500">{t("title")}</h1>
    </div>
  );
}
