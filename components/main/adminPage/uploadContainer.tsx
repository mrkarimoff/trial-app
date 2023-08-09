"use client";
import React, { useState } from "react";
import UploadForm from "./uploadForm";
import { Button } from "@/components/ui/button";

interface UploadContainerProps {
  UiTranlations: any;
  getJsons: () => Promise<void>;
}

const UploadContainer = ({ getJsons, UiTranlations }: UploadContainerProps) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpenModal(true)} className="py-2 px-4 mx-2">
        {UiTranlations.uploadBtn}
      </Button>

      <UploadForm
        UiTranlations={UiTranlations}
        getJsons={getJsons}
        setOpenModal={setOpenModal}
        openModal={openModal}
      />
    </div>
  );
};

export default UploadContainer;
