"use client";

import { useState, useCallback, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: String;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: String;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondayLable?: String;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondayLable,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);
  const handleSecondryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (showModal == false) {
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-center inset-0 z-50 fixed overflow-x-hidden overflow-y-auto focus:outline-none bg-neutral-300/70">
        <div
          className="relative w-full
            md:w-4/6
            lg:w-3/6
            xl:w-2/5
            my-6
            mx-auto
            h-full
            lg:h-auto
            md:h-auto
        "
        >
          {/* content */}
          <div
            className={`tranlate duration-300 h-full ${
              showModal ? "translate-y-0" : "translate-y-full"
            } ${showModal ? "opacity-100" : "opacity-0"}`}
          >
            <div className="tranlate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* header */}
              <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                <button className="p-1 border-0 hover:opacity-70 transition absolute left-0">
                  <IoMdClose />
                </button>
                <div>{title}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
