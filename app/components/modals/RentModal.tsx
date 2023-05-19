"use client";

import useRentModal from "@/app/hooks/useRentModal ";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import Heading from "./Heading";
import { categories } from "../navbar/categories";
import CategoryBoxInput from "../Input/CategoryBoxInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../../components/Input/CountrySelect"

import dynamic from 'next/dynamic'

enum STEPS {
  CATEGORY = 0,
  LOCATION=1,
  INFO=2,
  IMAGES=3,
  DESCRIPTION=4,
  PRICE=5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

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

  

  const {register, handleSubmit, setValue, watch, formState: {
    errors
  }, reset} = useForm<FieldValues>({
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

  const category = watch('category')
  const location = watch('location')

  const Map = useMemo(() => dynamic(() => import('../Map'), { 
    ssr: false 
  }), [location]);

  const setCustomValue = (id:string, value:any) => {
    setValue(id, value, {
      shouldValidate:true,
      shouldTouch:true,
      shouldDirty:true
    })
  }

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title={"which of these best describes your palce?"}
        subtitle={"pick your category"}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <CategoryBoxInput key={item.label} onClick={(category) => setCustomValue('category', category)} label={item.label} icon={item.icon} selected={category === item.label} />
        ))}
      </div>
    </div>
  );

  if(step === STEPS.LOCATION){
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect value={location} onChange={(value) => setCustomValue('location', value)} />
        <Map center={location?.latlng} />
      </div>
    )
  }

  return (
    <Modal
      title={"airbnb your home"}
      onSubmit={onNext}
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
