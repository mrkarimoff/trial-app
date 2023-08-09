"use client";
import { IoCloseOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { modalContent } from "@/lib/motions";
import { CSSProperties, ReactNode } from "react";
import { Button } from "./button";

interface IModalContent {
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

const ModalContent = ({ title, children, btn, close, modalContentStyle, form }: IModalContent) => {
  return (
    <motion.div
      style={modalContentStyle}
      initial={"hidden"}
      animate={"visible"}
      exit={"hidden"}
      variants={modalContent}
      onClick={(e) => e.stopPropagation()}
      className="relative h-[450px] w-[440px] overflow-y-auto rounded-lg bg-white dark:bg-slate-600 p-5"
    >
      <button
        onClick={close}
        className="absolute text-black dark:text-white left-5 top-5 p-1 hover:border"
      >
        <IoCloseOutline size={18} />
      </button>
      <h1 className="text-center text-sm text-black dark:text-white font-semibold">{title}</h1>
      <div className="absolute left-0 top-16 h-[1px] w-full bg-gray-200"></div>
      <div className="mt-9">{children}</div>

      {btn && (
        <div className="absolute bottom-5 left-0 w-full px-6 max-[420px]:bottom-3">
          <Button
            form={form}
            disabled={btn?.disabled || btn?.isUploading}
            type="submit"
            className="btn-info right-6 float-right flex h-10 w-[150px] items-center justify-center font-semibold disabled:bg-slate-300"
          >
            {btn?.isUploading ? btn.uploadingBtn : btn.submitBtn}
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default ModalContent;
