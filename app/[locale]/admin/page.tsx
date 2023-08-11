import AdminPageWithProvider from "@/components/main/adminPage/adminPageContainer";
import { useTranslations } from "next-intl";

const AdminPage = () => {
  const t = useTranslations("Admin");
  const tr = useTranslations("Error");
  const UiTranlations = {
    title: t("title"),
    userTab: t("userTab"),
    jsonsTab: t("jsonsTab"),
    noColumn: t("noColumn"),
    nameColumn: t("nameColumn"),
    emailColumn: t("emailColumn"),
    imageColumn: t("imageColumn"),
    roleColumn: t("roleColumn"),
    createdColumn: t("createdColumn"),
    updatedColumn: t("updatedColumn"),
    actionColumn: t("actionColumn"),
    uploadBtn: t("uploadBtn"),
    modalTitle: t("modalTitle"),
    uploadWarningMsg: t("uploadWarningMsg"),
    modalSubmitBtn: t("modalSubmitBtn"),
    uploading: t("uploading"),
    dropFilesMsg: t("dropFilesMsg"),
    dndFilesMsg: t("dndFilesMsg"),
    acceptedFiles: t("acceptedFiles"),
    rejectedFiles: t("rejectedFiles"),
    removeBtn: t("removeBtn"),
    errMsg: tr("errMsg"),
    noFile: t("noFile"),
  };

  return <AdminPageWithProvider UiTranlations={UiTranlations} />;
};

export default AdminPage;
