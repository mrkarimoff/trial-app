"use client";
import { useEffect, useState } from "react";

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

const Jsons = () => {
  const [data, setData] = useState<Array<JSONFile>>([]);

  const getJsons = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/jsons", { method: "GET" });
    const data: Array<JSONFile> = await res.json();
    setData(data);
  };

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

  return (
    <div>
      <h1>Jsons Page</h1>
      <ul className="space-y-5">
        {data?.map((item: JSONFile, index) => (
          <li key={item.id}>
            {index + 1 + ")"} {item.name}
            <button className="p-2 mx-1 bg-stone-300" onClick={() => handleDownloadClick(item.id)}>
              Download
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Jsons;
