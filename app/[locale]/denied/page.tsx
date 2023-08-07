import { options } from "@/app/api/auth/[...nextauth]/options";
import SignInMessage from "@/components/main/deniedPage/signInMessage";
import { getServerSession } from "next-auth";
import Link from "next/link";
// import { useTranslations } from "next-intl";

const DeniedPage = async () => {
  // const t = useTranslations("Index");
  const session = await getServerSession(options);

  if (!session)
    return (
      <div className="my-20 gap-2 flex flex-col items-center">
        <h1 className="text-center text-red-600 text-2xl">Access Denied!!!</h1>
        <SignInMessage />
      </div>
    );

  if (session?.user.role !== "admin") {
    return (
      <div className="my-20 gap-2 flex flex-col items-center">
        <h1 className="text-center text-red-600 text-2xl">Access Denied!!!</h1>
        <p>
          You do not have admin permissions, please{" "}
          <Link className="underline text-blue-600" href={"/role"}>
            change your role
          </Link>
        </p>
      </div>
    );
  }
};

export default DeniedPage;

{
  /* <h1 className="text-center text-red-600 text-2xl">{t("denied")}</h1> */
}
