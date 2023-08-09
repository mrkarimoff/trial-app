"use client";
import Modal from "@/components/ui/modal";
import { useToast } from "@/components/ui/use-toast";
import { readFileAsText } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import React, { FormEvent, useState } from "react";
import Dropzone from "../dropzone";

interface IUploadForm {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
  getJsons: () => Promise<void>;
}

type JsonFile = {
  data: string;
  name: string;
};

const UploadForm = ({ setOpenModal, openModal, getJsons }: IUploadForm) => {
  const { toast } = useToast();
  const [files, setFiles] = useState<Array<File>>([]);
  const [isUploading, setIsUploading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsUploading(true);

    if (!files?.length)
      return toast({
        title: "Please upload your file/files!",
      });

    let jsons: JsonFile[] = [];
    for (const file of files) {
      const fileText = await readFileAsText(file);
      jsons.push({ data: fileText, name: file.name });
    }

    // upload the files
    const data = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/admin/upload", {
      method: "POST",
      body: JSON.stringify(jsons),
    }).then(async (res) => await res.json());

    console.log(data);
    emptyForm();
    getJsons();
  }

  const emptyForm: () => void = () => {
    setIsUploading(false);
    setOpenModal(false);
    setFiles([]);
  };

  return (
    <AnimatePresence>
      {openModal && (
        <Modal
          btn={{
            disabled: false,
            isUploading,
          }}
          title={"Upload your JSON"}
          visible={openModal}
          close={emptyForm}
          form="uploadForm"
        >
          <form id="uploadForm" onSubmit={handleSubmit}>
            <Dropzone
              {...{ files, setFiles }}
              className="mx-auto w-fit cursor-pointer border border-dashed border-neutral-300 p-10 transition-colors hover:border-red-400"
            />
          </form>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default UploadForm;
