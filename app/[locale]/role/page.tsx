import RolePageWithProvider from "@/components/main/rolePage/rolePageContainer";
import { useTranslations } from "next-intl";

const RolePage = () => {
  const t = useTranslations("RolePage");
  const tr = useTranslations("Error");
  const UiTranslations = {
    update: t("update"),
    currentRole: t("currentRole"),
    changeToParticipant: t("changeToParticipant"),
    changeToUser: t("changeToUser"),
    changeToAdmin: t("changeToAdmin"),
    errMsg: tr("errMsg"),
  };
  return <RolePageWithProvider UiTranslations={UiTranslations} />;
};

export default RolePage;
