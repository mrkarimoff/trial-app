"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SignInModal from "../signInModal";

const SignInMessage = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="flex gap-2 justify-center flex-col items-center">
      <h2 className="text-center text-xl">
        Please sign in to your account <br /> to have access to this page
      </h2>
      <Button className="w-1/2" onClick={() => setOpenModal(true)}>
        Sign in
      </Button>
      <SignInModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default SignInMessage;
