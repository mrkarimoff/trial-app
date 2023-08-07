import { AnimatePresence } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { signIn } from "next-auth/react";
import React, { useEffect } from "react";
import Modal from "../ui/modal";

interface ISingInModal {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignInModal = ({ openModal, setOpenModal }: ISingInModal) => {
  let redirectUrl = process.env.NEXT_PUBLIC_DOMAIN + "/role";

  useEffect(() => {
    const url = new URL(location.href);
    redirectUrl = url.searchParams.get("callbackUrl")! ?? redirectUrl;
  });

  return (
    <>
      <AnimatePresence>
        {openModal && (
          <Modal
            modalContentStyle={{ height: "240px", width: "400px", position: "relative" }}
            title={"Sign in to your account"}
            visible={openModal}
            close={() => setOpenModal(false)}
          >
            <div className="flex h-[130px] flex-col items-center justify-center gap-3">
              <button
                onClick={() =>
                  signIn("github", {
                    callbackUrl: redirectUrl,
                  })
                }
                className="social-btn relative mx-auto bg-white dark:bg-slate-700 flex w-[300px] items-center justify-center rounded-lg border-2 border-solid border-[#ECECEC] py-4 pl-4 pr-0 transition-shadow"
              >
                <SiGithub className="absolute left-5 text-black dark:text-white" size={28} />
                <span className="text-[17px] text-black dark:text-white">Sign in with Github</span>
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default SignInModal;
