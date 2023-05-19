'use client'

import React from "react";
import { IconType } from "react-icons/lib";

interface CategoryBoxInputProps {
  onClick: (value: string) => void;
  label: string;
  icon: IconType;
  selected: boolean;
}

const CategoryBoxInput: React.FC<CategoryBoxInputProps> = ({
  onClick,
  label,
  icon: Icon,
  selected,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${
        selected ? "border-black" : "border-neutral-200"
      }`}
    >
      <Icon size={26} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryBoxInput;
