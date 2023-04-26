"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useState, useCallback } from "react";
import MenuItem from "./MenuItem"

const Usermenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleUserMenu = useCallback(() => {
    setIsOpen((val) => !val);
  }, []);
  const handleMenuItemClick = () => {

  }
  return (
    <div className="relative">
      <div className="flex items-center flex-row">
        <div
          className="
                hidden
                md:block
                text-sm
                hover:bg-neutral-200
                transition
                py-3
                px-4
                font-semibold
                cursor-pointer
                rounded-full
                "
        >
          Airbnb your home
        </div>
        <div
          onClick={handleUserMenu}
          className="flex flex-row items-center p-4 md:py-1 md:px-2 border-[1px] border-neutral-300 rounded-full cursor-pointer hover:shadow-md gap-3"
        >
          <AiOutlineMenu />
          <Avatar />
        </div>
      </div>
      {isOpen && (
        <div
          className="
                    absolute
                    bg-white
                    rounded-xl
                    shadow-md
                    top-12
                    right-0
                    w-[40vw]
                    md:w-3/4
                    text-sm
                    "
        >
          <div
            className="flex
                    flex-col
                "
          >
            <MenuItem onclick={() => handleMenuItemClick()} label={'Sign up'} />
            <MenuItem onclick={() => handleMenuItemClick()} label={'Log in'} />
            <MenuItem onclick={() => handleMenuItemClick()} label={'Airbnb your home'} />
            <MenuItem onclick={() => handleMenuItemClick()} label={'help'} />
          </div>
        </div>
      )}
    </div>
  );
};
export default Usermenu;
