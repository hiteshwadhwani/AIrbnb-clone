"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import React, { useCallback, useMemo, useState } from "react";
import Modal from "./Modal";

import { Range } from "react-date-range";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { CountrySelectValue } from "../Input/CountrySelect";
import qs from 'query-string'
import {formatISO} from 'date-fns'

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

export default function SearchModal() {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [location, setLocation] = useState<CountrySelectValue>()
  const [steps, setSteps] = useState(STEPS.LOCATION);

  const [guestCount, setGuestCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [roomCount, setRoomCound] = useState(1);

  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(() => dynamic(() => import('../Map'), {ssr: false}), [location])

  const onback = useCallback(() => {
    setSteps((val) => val - 1);
  }, []);

  const onNext = useCallback(() => {
    setSteps((val) => val + 1);
  }, []);

  const onSumbit = useCallback(() => {
    if(steps !== STEPS.INFO){
        return onNext()
    }

    let searchQuery : any = {}

    if(params){
        searchQuery = qs.parse(params.toString())
    }

    const updatdQuery = {
        ...searchQuery,
        location: location?.value,
        guestCount,
        roomCount,
        bathroomCount
    }

    if(dateRange.startDate){
        updatdQuery.startDate = formatISO(dateRange.startDate)
    }
    if(dateRange.endDate){
        updatdQuery.endDate = formatISO(dateRange.endDate)
    }

    const url = qs.stringifyUrl({
        url: '/',
        query: updatdQuery
    }, {skipNull: true})

    setSteps(STEPS.LOCATION)
    searchModal.onClose()
    router.push(url)


  }, [bathroomCount, roomCount, guestCount, dateRange, location, onNext, params, router, searchModal, steps]);

  return (
    <Modal
      onClose={searchModal.onClose}
      isOpen={searchModal.isOpen}
      onSubmit={onSumbit}
      actionLabel={"seach"}
      title={"filters"}
    />
  );
}
