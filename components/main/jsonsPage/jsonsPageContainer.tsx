"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { FaFileDownload } from "react-icons/fa";

type JSONFile = {
  id: number;
  data: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type JSONData = {
  id: number;
  data: JSON;
  name: string;
};

type JsonsPageContainerProps = {
  title: string;
  noFilesMsg: string;
};

const JsonsPageContainer = ({ title, noFilesMsg }: JsonsPageContainerProps) => {
  const { toast } = useToast();
  const [data, setData] = useState<Array<JSONFile>>([]);

  useEffect(() => {
    getJsons();
  }, []);

  const handleDownloadClick = async (id: number) => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_DOMAIN + `/api/jsons/${id}`, {
        method: "GET",
      });
      const jsonData: JSONData = await res.json();

      // Convert the JSON data to a Blob
      const blobData = new Blob([JSON.stringify(jsonData?.data, null, 2)], {
        type: "application/json",
      });

      // Create a temporary anchor element to trigger the download
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blobData);
      downloadLink.download = jsonData?.name as string; // Set the desired file name here
      downloadLink.click();

      // Clean up the temporary anchor element
      URL.revokeObjectURL(downloadLink.href);
    } catch (error) {
      console.error("Error fetching JSON data:", error);
    }
  };

  async function getJsons() {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/jsons", { method: "GET" });
      const data: Array<JSONFile> = await res.json();
      setData(data);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.message,
      });
    }
  }
  return (
    <div className="container">
      <h1 className="text-center text-xl my-2 font-semibold">{title}</h1>

      <ul className="flex flex-col items-center gap-4 mt-4">
        {data.length > 0 ? (
          data.map((item: JSONFile, index) => (
            <li
              className="bg-stone-100  dark:bg-slate-600 border w-full lg:w-1/2 py-2 px-3 border-solid border-slate-400 rounded-md flex justify-between items-center"
              key={item.id}
            >
              {index + 1 + ")"} {item.name}
              <Button
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
    </div>
  );
};

export default JsonsPageContainer;
