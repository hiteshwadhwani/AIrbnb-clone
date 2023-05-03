"use client";

import React from "react";
import { IconType } from "react-icons/lib";
interface ButtonProps {
  label: String;
  onCLick: (e : React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  rounded ?: boolean
}

const Button: React.FC<ButtonProps> = ({
  label,
    onCLick,
  disabled,
  outline,
  small,
  icon: Icon,
  rounded
}) => {
  return (
    <button
      onClick={onCLick}
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-80 transition w-full ${rounded && 'rounded-full'} ${
        outline ? "bg-white" : "bg-rose-500"
      } ${outline ? "border-black" : "border-rose-500"} ${
        outline ? "text-black" : "text-white"
      } ${small ? "py-1" : "py-2"} ${small ? "text-sm" : "text-md"} ${
        small ? "font-light" : "font-semibold"
      } ${small ? "border-[1px]" : "border-2"}`}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-2" />}
      {label}
    </button>
  );
};
export default Button;
