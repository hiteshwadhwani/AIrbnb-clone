"use client";

import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import { toast } from "react-hot-toast";

import useRegisterModal from "../../hooks/userRegisterModal";
import Heading from "./Heading";
import Input from "./Input";
import Button from "./Button";
import { signIn } from "next-auth/react";

const RegisterdModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("user registed");
        registerModal.onClose();
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.toString())
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const BodyComponent = (
    <div className="flex flex-col gap-4 mt-3">
      <Heading
        title={"Welcome to Airbnb"}
        subtitle={"Register to continue"}
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
        id="name"
        label="name"
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
        onCLick={() => {signIn("google")}}
        icon={FcGoogle}
        outline
      />
      <Button
        label="Continue with Github"
        onCLick={() => {signIn("github")}}
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
      isOpen={registerModal.isOpen}
      title={"Register"}
      actionLabel={"continue"}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      footer={FooterComponent}
    />
  );
};
export default RegisterdModal;
