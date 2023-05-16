'use client'

import useRentModal from "@/app/hooks/useRentModal ";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

enum STEPS {
  CATEGORY = 0,
  LOCATION,
  INFO,
  IMAGES,
  DESCRIPTION,
  PRICE,
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
    return "BACK";
  }, [step]);

  const secondayActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return "NEXT";
    }
    return "BACK";
  }, [step]);
  return (
    <Modal
      title={"airbnb your home"}
      onSubmit={() => {}}
      onClose={rentModal.onClose}
      isOpen={rentModal.isOpen}
      actionLabel={actionLabel}
      SecondaryActionLabel={secondayActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack} 
    />
  );
};
export default RentModal;
