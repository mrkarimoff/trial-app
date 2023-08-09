import JsonsPageContainer from "@/components/main/jsonsPage/jsonsPageContainer";
import { useTranslations } from "next-intl";

const jsonsPage = () => {
  const t = useTranslations("JsonsPage");

  return <JsonsPageContainer title={t("title")} noFilesMsg={t("noFilesMsg")} />;
};

export default jsonsPage;
