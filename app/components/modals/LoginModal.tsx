"use client";

import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import { toast } from "react-hot-toast";
import {signIn} from 'next-auth/react'

import useRegisterModal from "../../hooks/userRegisterModal";
import useLoginModal from '../../hooks/useLoginModal'
import Heading from "./Heading";
import Input from "./Input";
import Button from "./Button";
import { useRouter } from "next/navigation";

const RegisterdModal = () => {
    const router = useRouter()
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
        ...data, redirect: false
    }).then((callback) => {
        setIsLoading(false)

        if(callback?.ok){
            toast.success("Logged In")
            router.refresh()
            loginModal.onClose();
        }
        if(callback?.error){
            toast.error(callback.error)
        }
    })
  };

  const BodyComponent = (
    <div className="flex flex-col gap-4 mt-3">
      <Heading
        title={"Welcome to Airbnb"}
        subtitle={"Login to continue"}
        center
      />
      <Input
        id="email"
        label="email"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="password"
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const FooterComponent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        label="Continue with Google"
        onCLick={() => {}}
        icon={FcGoogle}
        outline
      />
      <Button
        label="Continue with Google"
        onCLick={() => {}}
        icon={AiFillGithub}
        outline
      />
      <div className="mt-4 text-neutral-500">
        <div className="flex flex-row justify-center gap-4">
          <div>Already have an account ?</div>
          <div
            onClick={registerModal.onClose}
            className="cursor-pointer text-neutral-800 hover:underline"
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      body={BodyComponent}
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title={"Login"}
      actionLabel={"continue"}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      footer={FooterComponent}
    />
  );
};
export default RegisterdModal;
