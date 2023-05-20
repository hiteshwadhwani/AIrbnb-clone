import React, { useCallback } from "react";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface imageUploadsProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload: React.FC<imageUploadsProps> = ({ value, onChange }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="edx3lugs"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
          relative
          cursor-pointer
          hover:opacity-80
          transition border-dashed
          border-2
          p-20
          border-neutral-300
          flex flex-col
          justify-center
          items-center
          gap-4 text-neutral-600
          "
          >
            <TbPhotoPlus size={50} />
            <div className="text-lg font-semibold">click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                  alt="house"
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};
export default ImageUpload;
