"use client";

import useRentModal from "@/app/hooks/useRentModal ";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import Heading from "./Heading";
import { categories } from "../navbar/categories";
import CategoryBoxInput from "../Input/CategoryBoxInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../../components/Input/CountrySelect";
import Counter from "../../components/Input/Counter";
import ImageUpload from "../../components/Input/ImageUpload";

import dynamic from "next/dynamic";
import Input from "./Input";
import axios from "axios";
import { toast } from "react-hot-toast";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [isLoading, setLoading] = useState(false);

  const [step, setStep] = useState(STEPS.CATEGORY);

  const onBack = () => {
    setStep((val) => val - 1);
  };
  const onNext = () => {
    setStep((val) => val + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "CREATE";
    }
    return "Next";
  }, [step]);

  const secondayActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return "NEXT";
    }
    return "BACK";
  }, [step]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const bathroomCount = watch("bathroomCount");
  const roomCount = watch("roomCount");
  const imageSrc = watch("imageSrc");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    setLoading(true);
    axios
      .post("/api/listing", data)
      .then((res) => {
        toast.success("Listing Created !");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch((error) => toast.error("something went wrong"))
      .finally(() => setLoading(false));
  };

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });
  };

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title={"which of these best describes your palce?"}
        subtitle={"pick your category"}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <CategoryBoxInput
            key={item.label}
            onClick={(category) => setCustomValue("category", category)}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={"Share some basics about your place"}
          subtitle={"What amenities do you have?"}
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={"Add a photo of your place"}
          subtitle={"show guests what your place looks like"}
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={"How would you describe your place?"}
          subtitle={"Short and sweet works best!"}
        />
        <Input
          register={register}
          id="title"
          label="title"
          disabled={isLoading}
          errors={errors}
          required
        />
        <hr />
        <Input
          register={register}
          id="description"
          label="description"
          disabled={isLoading}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title={""} subtitle={""} />
        <Input
          id="price"
          label="price"
          register={register}
          disabled={isLoading}
          errors={errors}
          required
          type="number"
          formatPrice
        />
      </div>
    );
  }

  return (
    <Modal
      title={"airbnb your home"}
      onSubmit={handleSubmit(onSubmit)}
      onClose={rentModal.onClose}
      isOpen={rentModal.isOpen}
      actionLabel={actionLabel}
      SecondaryActionLabel={secondayActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};
export default RentModal;