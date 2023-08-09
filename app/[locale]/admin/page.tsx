import AdminPageWithProvider from "@/components/main/adminPage/adminPageContainer";
import { useTranslations } from "next-intl";

const AdminPage = () => {
  const t = useTranslations("Index");

  return <AdminPageWithProvider />;
};

export default AdminPage;
