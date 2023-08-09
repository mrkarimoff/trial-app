"use client";

import { FormEvent, useState } from "react";

// import { useTranslations } from "next-intl";

const AdminPage = () => {
  const [file, setFile] = useState<File>();
  // const t = useTranslations("Index");

  const sumbitForm = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("jsonFile", file as File);

    const data = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/admin/upload", {
      method: "POST",
      body: formData,
    }).then(async (res) => await res.json());

    console.log(data);
  };

  return (
    <div>
      <h1>Upload JSON</h1>
      <form onSubmit={sumbitForm}>
        <input
          required
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <button className="p-2 border">save</button>
      </form>
    </div>
  );
};

export default AdminPage;
