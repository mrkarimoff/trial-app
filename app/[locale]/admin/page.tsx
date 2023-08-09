"use client";

import React, { useState, ChangeEvent } from "react";

// import { useTranslations } from "next-intl";
import { useEffect } from "react";

const AdminPage = () => {
  const [fileContent, setFileContent] = useState<string>("");

  useEffect(() => {
    if (fileContent) {
      uploadToApi();
    }
  }, [fileContent]);

  async function uploadToApi() {
    const data = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/admin/upload", {
      method: "POST",
      body: JSON.stringify([{ data: fileContent, name: "MyJSONBek" }]),
    }).then(async (res) => await res.json());

    console.log(data);
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        const fileText = await readFileAsText(file);
        setFileContent(fileText);
      } catch (error) {
        console.error("Error reading the file:", error);
      }
    }
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const text = event.target?.result as string;
        resolve(text);
      };

      reader.onerror = (event) => {
        reject(event.target?.error);
      };

      reader.readAsText(file, "utf-8");
    });
  };

  return (
    <div>
      <h1>Upload JSON</h1>
      <input required type="file" onChange={handleFileChange} />
      <h2>{fileContent}</h2>
    </div>
  );
};

export default AdminPage;
