'use client'

import React, {useCallback, useMemo} from "react";
import { SafeUser, safeListing, safeReservation } from "../../types/index";
import { useRouter } from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import Image from "next/image";
import HeartButton from "./HeartButton"
import {format} from 'date-fns'
import Button from "../modals/Button";

interface listingCardProps {
  currentUser?: SafeUser | null;
  data: safeListing;
  reservation?: safeReservation;
  disabled?: boolean;
  actionLabel?: string;
  actionID?: string;
  onAction ?: (id:string) => void
}

const ListingCard: React.FC<listingCardProps> = ({
  currentUser,
  data,
  reservation,
  disabled,
  actionLabel,
  actionID = '',
  onAction
}) => {
  const router = useRouter();
  const {getByValue} = useCountries()

  const location = getByValue(data.locationValue)

  const handleCancel = useCallback((e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if(disabled){
        return
    }
    onAction?.(actionID)
  }, [actionID, onAction, disabled])

  const reservationDate = useMemo(() => {
    if(!reservation){
        return null
    }
    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation])

  const price = useMemo(() => {
    if(reservation){
        return reservation.totalPrice
    }
    return data.price
  }, [reservation, data])


  return (
    <div onClick={() => router.push(`/listing/${data.id}`)} className="group col-span-1 cursor-pointer">
        <div className="flex flex-col gap-2 w-full">
            <div className="w-full relative overflow-hidden aspect-square rounded-xl">
                <Image fill className="object-cover w-full h-full group-hover:scale-110 transition" src={data.imageSrc} alt="listing" />
                <div className="absolute right-3 top-3">
                    <HeartButton listingID={data.id} currentUser={currentUser} />
                </div>
            </div>
            <div className="font-semibold text-lg">
                {location?.region}, {location?.label}
            </div>
            <div className="font-light text-neutral-500">
                {reservationDate || data.category}
            </div>
            <div className="flex flex-row items-start gap-1">
                <div>$ {price}</div>
                {!reservation && (
                    <div className="font-light">
                        night
                    </div>
                )}
            </div>
            {actionLabel && onAction && (
                <Button label={actionLabel} disabled={disabled} small onCLick={handleCancel} />
            )}
        </div>
    </div>
  )
};
export default ListingCard;
