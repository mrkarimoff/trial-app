"use client";
import React, { useState } from "react";
import UploadForm from "./uploadForm";
import { Button } from "@/components/ui/button";

const UploadContainer = ({ getJsons }: { getJsons: () => Promise<void> }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpenModal(true)} className="py-2 px-4 mx-2">
        Upload JSON
      </Button>

      <UploadForm getJsons={getJsons} setOpenModal={setOpenModal} openModal={openModal} />
    </div>
  );
};

export default UploadContainer;
