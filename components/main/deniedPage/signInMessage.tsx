"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SignInModal from "../signInModal";

const SignInMessage = ({ UiTranslations }: { UiTranslations: any }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex gap-2 justify-center flex-col items-center">
      <h2 className="text-center text-xl w-[300px]">{UiTranslations.signInWarning}</h2>
      <Button className="w-1/2" onClick={() => setOpenModal(true)}>
        {UiTranslations.signInBtn}
      </Button>
      <SignInModal
        UiTranslations={UiTranslations}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default SignInMessage;
