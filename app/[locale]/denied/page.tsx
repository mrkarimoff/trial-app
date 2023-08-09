import { options } from "@/app/api/auth/[...nextauth]/options";
import SignInMessage from "@/components/main/deniedPage/signInMessage";
import { getServerSession, Session } from "next-auth";
import Link from "next/link";
import { useTranslations } from "next-intl";

const DeniedPage = ({ session }: { session: Session | null }) => {
  const t = useTranslations("DeniedPage");
  const UiTranslations = {
    deniedMsg: t("deniedMsg"),
    warning: t("warning"),
    changeRoleBtn: t("changeRoleBtn"),
    signInWarning: t("signInWarning"),
    signInBtn: t("signInBtn"),
    signInModalTitle: t("signInModalTitle"),
    signInGithub: t("signInGithub"),
  };

  if (!session)
    return (
      <div className="my-20 gap-2 flex flex-col items-center">
        <h1 className="text-center text-red-600 text-2xl">{UiTranslations.deniedMsg}</h1>
        <SignInMessage UiTranslations={UiTranslations} />
      </div>
    );

  if (session?.user.role !== "admin") {
    return (
      <div className="my-20 gap-2 flex flex-col items-center">
        <h1 className="text-center text-red-600 text-2xl">{UiTranslations.deniedMsg}</h1>
        <p className="text-center">
          {UiTranslations.warning}{" "}
          <Link className="underline text-blue-600" href={"/role"}>
            {UiTranslations.changeRoleBtn}
          </Link>
        </p>
      </div>
    );
  }
  return null;
};

const DeniedPageContainer = async () => {
  const session = await getServerSession(options);

  return <DeniedPage session={session} />;
};

export default DeniedPageContainer;
