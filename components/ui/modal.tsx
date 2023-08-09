"use client";
import { modal } from "@/lib/motions";
import { motion } from "framer-motion";
import { CSSProperties, ReactNode, useEffect } from "react";
import ModalContent from "./modalContent";

interface IModal {
  visible: boolean;
  title: string;
  btn?: {
    disabled: boolean;
    isUploading: boolean;
    submitBtn: string;
    uploadingBtn: string;
  };
  children: ReactNode;
  close: () => void;
  modalContentStyle?: CSSProperties | undefined;
  form?: string;
}

const Modal = ({ visible, close, title, children, btn, modalContentStyle, form }: IModal) => {
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [visible]);

  return (
    <motion.div
      style={{ display: visible ? "flex" : "none" }}
      key={"overlay"}
      initial={"hidden"}
      animate={"visible"}
      exit={"hidden"}
      variants={modal}
      onClick={close}
      className="fixed left-0 top-0 z-[99] flex h-screen w-full items-center justify-center bg-overlay px-3"
    >
      <ModalContent {...{ btn, title, close, modalContentStyle, form }}>{children}</ModalContent>
    </motion.div>
  );
};

export default Modal;
