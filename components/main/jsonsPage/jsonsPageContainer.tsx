"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { FaFileDownload } from "react-icons/fa";
import { Loader } from "../loader";

type JSONFile = {
  id: number;
  data: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type JsonsPageContainerProps = {
  title: string;
  noFilesMsg: string;
  errMsg: string;
};

const JsonsPageContainer = ({ title, noFilesMsg, errMsg }: JsonsPageContainerProps) => {
  const { toast } = useToast();
  const [data, setData] = useState<Array<JSONFile>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    getJsons();
  }, []);

  const handleDownloadClick = async (id: number) => {
    setIsDownloading(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_DOMAIN + `/api/jsons/${id}`, {
        method: "GET",
      });
      const jsonData = await res.json();
      if (jsonData?.message) throw new Error();

      // Convert the JSON data to a Blob
      const blobData = new Blob([JSON.stringify(jsonData?.data, null, 2)], {
        type: "application/json",
      });

      // Create a temporary anchor element to trigger the download
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blobData);
      downloadLink.download = jsonData?.name; // Set the desired file name here
      downloadLink.click();

      // Clean up the temporary anchor element
      URL.revokeObjectURL(downloadLink.href);
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: errMsg });
    }
    setIsDownloading(false);
  };

  async function getJsons() {
    setIsLoading(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/jsons", { method: "GET" });
      const data = await res.json();

      if (data?.message) throw new Error();
      setData(data);
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: errMsg });
    }
    setIsLoading(false);
  }

  return (
    <div className="container">
      <h1 className="text-center text-xl my-2 font-semibold">{title}</h1>

      {isLoading ? (
        <Loader />
      ) : (
        <ul className="flex flex-col items-center gap-4 mt-4">
          {data.length > 0 ? (
            data.map((item: JSONFile, index) => (
              <li
                className="bg-stone-100  dark:bg-slate-600 border w-full lg:w-1/2 py-2 px-3 border-solid border-slate-400 rounded-md flex justify-between items-center"
                key={item.id}
              >
                {index + 1 + ")"} {item.name}
                <Button
                  disabled={isDownloading}
                  className="social-btn"
                  variant={"outline"}
                  onClick={() => handleDownloadClick(item.id)}
                >
                  <FaFileDownload className="text-green-500" size={22} />
                </Button>
              </li>
            ))
          ) : (
            <li className="text-center my-3 text-xl font-semibold text-orange-400">{noFilesMsg}</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default JsonsPageContainer;
