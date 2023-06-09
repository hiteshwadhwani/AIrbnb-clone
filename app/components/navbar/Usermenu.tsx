"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import React, { useState, useCallback } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "../../hooks/userRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import {SafeUser} from "../../types/index"
import useRentModal from "@/app/hooks/useRentModal ";
import { useRouter } from "next/navigation";


interface userMenuProps {
  currentUser?: SafeUser | null;
}

const Usermenu: React.FC<userMenuProps> = ({ currentUser }) => {
  const router = useRouter()
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal()
  const [isOpen, setIsOpen] = useState(false);
  const handleUserMenu = useCallback(() => {
    setIsOpen((val) => !val);
  }, []);

  const onRent = useCallback(() => {
    
    if(!currentUser){
      return loginModal.onOpen()
    }
    return rentModal.onOpen()

  }, [currentUser, loginModal, rentModal])
  return (
    <div className="relative">
      <div className="flex items-center flex-row">
        <div
          onClick={onRent}
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
          <Avatar src={currentUser?.image} />
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
            {currentUser ? (
              <>
                <MenuItem onclick={() => router.push('/trips')} label={"My trips"} />
                <MenuItem onclick={() => {}} label={"My favourites"} />
                <MenuItem onclick={() => {}} label={"My Reversation"} />
                <MenuItem onclick={() => {}} label={"My Properties"} />
                <MenuItem onclick={() => {}} label={"Airbnb My home"} />
                <hr />
                <MenuItem onclick={() => signOut()} label={"Logout"} />
              </>
            ) : (
              <>
                <MenuItem onclick={registerModal.onOpen} label={"Sign up"} />
                <MenuItem onclick={loginModal.onOpen} label={"Log in"} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Usermenu;
