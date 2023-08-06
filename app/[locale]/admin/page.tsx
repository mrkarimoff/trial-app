import { useTranslations } from "next-intl";

const AdminPage = () => {
  const t = useTranslations("Index");
  return (
    <div>
      <h1 className="text-center text-xl font-semibold">{t("admin")}</h1>
    </div>
  );
};

export default AdminPage;
