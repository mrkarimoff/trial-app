import JsonsPageContainer from "@/components/main/jsonsPage/jsonsPageContainer";
import { useTranslations } from "next-intl";

const JsonsPage = () => {
  const t = useTranslations("JsonsPage");
  const tr = useTranslations("Error");

  return (
    <JsonsPageContainer errMsg={tr("errMsg")} title={t("title")} noFilesMsg={t("noFilesMsg")} />
  );
};

export default JsonsPage;
