import { useTranslations } from "next-intl";

type JsonData = {
  id: number;
  data: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

function HomeContent({ jsonFile }: { jsonFile: JsonData }) {
  const t = useTranslations("HomePage");

  return (
    <div className="container flex flex-col gap-1 items-center">
      <h1 className="mt-3 text-xl font-semibold text-center">{t("title")}</h1>
      {jsonFile ? (
        <ul>
          <li className="my-2">
            {t("fileName")} <span className="text-red-400 font-semibold">{jsonFile.name}</span>
          </li>
          <li className="bg-slate-800 mx-2 rounded-md w-[300px] sm:w-[400px] md:w-[600px] max-h-[480px] overflow-auto text-slate-50 p-5">
            <pre>
              <code>{jsonFile.data.trim()}</code>
            </pre>
          </li>
        </ul>
      ) : (
        <h2 className="text-xl mt-3">{t("noFile")}</h2>
      )}
    </div>
  );
}

function HomeContentError() {
  const tr = useTranslations("Error");

  return (
    <div className="container flex flex-col gap-1 items-center">
      <h1 className="mt-3 text-xl font-semibold text-center text-red-600">{tr("errMsg")}</h1>
    </div>
  );
}

export default async function Home() {
  try {
    const jsonFile = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/public", {
      cache: "no-store",
    }).then(async (res) => await res.json());

    if (jsonFile?.message) throw new Error();
    return <HomeContent jsonFile={jsonFile} />;
  } catch (error) {
    console.error(error);
    return <HomeContentError />;
  }
}
