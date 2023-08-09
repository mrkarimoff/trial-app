import JsonsPageContainer from "@/components/main/jsonsPage/jsonsPageContainer";
import { useTranslations } from "next-intl";

const JsonsPage = () => {
  const t = useTranslations("JsonsPage");

  return <JsonsPageContainer title={t("title")} noFilesMsg={t("noFilesMsg")} />;
};

export default JsonsPage;
