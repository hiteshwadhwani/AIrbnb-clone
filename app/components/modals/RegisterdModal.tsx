"use client";

import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";

import useRegisterModal from "../../hooks/userRegisterModal";
import Heading from "./Heading";
import Input from "./Input";
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";

const RegisterdModal = () => {
    const registerModal = useRegisterModal()
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

  const onSubmit:SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios.post("/api/register", data).then(() => {
        registerModal.onClose();
    }).catch((error) => console.log(error)).finally(() => {
        setIsLoading(false)
    })

  }

  const BodyComponent = (
    <div className="flex flex-col gap-4 mt-3">
      <Heading title={'Welcome to Airbnb'} subtitle={'Register to continue'} center />
      <Input id="email" label="email" register={register} errors={errors} required />
    </div>
  )

  return(
    <Modal body={BodyComponent} disabled={isLoading} isOpen={registerModal.isOpen} title={'Register'} actionLabel={'continue'} onClose={registerModal.onClose} onSubmit={handleSubmit(onSubmit)} />
  )
};
export default RegisterdModal;
