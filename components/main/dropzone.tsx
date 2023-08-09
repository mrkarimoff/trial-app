import Link from "next/link";
import React, { useCallback, useState } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { HiXMark } from "react-icons/hi2";
import { LuImagePlus } from "react-icons/lu";

interface IDropZone {
  className: string;
  files: Array<File>;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const Dropzone = ({ className, files, setFiles }: IDropZone) => {
  const [rejected, setRejected] = useState<FileRejection[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
      if (acceptedFiles?.length) {
        setFiles((previousFiles) => [...previousFiles, ...acceptedFiles]);
      }

      if (fileRejections?.length) {
        setRejected((previousFiles) => [...previousFiles, ...fileRejections]);
      }
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/json": [],
    },
    maxSize: 1024 * 2000,
    onDrop,
  });

  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeRejected = (name: string) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  return (
    <>
      <div
        {...getRootProps({
          className: className,
        })}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2">
          <LuImagePlus className="text-red-400" size={28} />
          {isDragActive ? (
            <p className="text-sm">Drop the files here ...</p>
          ) : (
            <p className="text-sm">Drag & drop files here, or click to select files</p>
          )}
        </div>
      </div>

      {/* Preview */}
      <section className="mt-1">
        {files?.length > 0 && (
          <div className="h-[160px] w-full overflow-y-auto overflow-x-hidden px-4">
            {/* Accepted files */}
            <h3 className="mt-3 border-b pb-2 text-sm font-semibold text-neutral-600 dark:text-white">
              Accepted Files
            </h3>
            <ul className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {files.map((file) => (
                <li key={file.name} className="relative rounded-md shadow-lg max-w-[200px]">
                  <span>{file.name}</span>
                  <button
                    type="button"
                    className="absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full border border-red-400 bg-red-400 transition-colors hover:bg-white"
                    onClick={() => removeFile(file.name)}
                  >
                    <HiXMark className="h-5 w-5 fill-white transition-colors hover:fill-red-400" />
                  </button>
                </li>
              ))}
            </ul>
            {/* Rejected Files */}
            {rejected?.length > 0 && (
              <h3 className="mt-3 border-b pb-2 text-sm font-semibold text-neutral-600 dark:text-white">
                Rejected Files
              </h3>
            )}
            <ul className="mt-3 flex flex-col">
              {rejected.map(({ file, errors }) => (
                <li key={file.name} className="flex items-start justify-between">
                  <div>
                    <p className="mt-2 text-sm font-medium text-neutral-500">{file.name}</p>
                    <ul className="text-[12px] text-red-400">
                      {errors.map((error) => (
                        <li key={error.code}>{error.message}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    className="border-secondary-400 mt-1 rounded-md border px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-neutral-500 dark:text-white transition-colors hover:bg-red-400 hover:text-white"
                    onClick={() => removeRejected(file.name)}
                  >
                    remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
};

export default Dropzone;
