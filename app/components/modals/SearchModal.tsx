"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import React, { useCallback, useMemo, useState } from "react";
import Modal from "./Modal";

import { Range, RangeKeyDict } from "react-date-range";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../Input/CountrySelect";
import qs from 'query-string'
import {formatISO} from 'date-fns'
import Heading from "./Heading";
import DatePicker from "../Input/Calendar";
import Counter from "../Input/Counter";

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

  const actionLabel = useMemo(() => {
    if(steps === STEPS.INFO){
      return 'Search'
    }
    return 'Next'
  }, [steps])
  const secondaryActionLabel = useMemo(() => {
    if(steps === STEPS.INFO){
      return undefined
    }
    return 'Back'
  }, [steps])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title={'Where do you wanna go?'} subtitle={'Find the perfect location'} />
      <CountrySelect value={location} onChange={(value) => setLocation(value as CountrySelectValue)} />
      <hr />
      <Map center={location?.latlng} />
    </div>
  )

  if(steps === STEPS.DATE){
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title={'When do you plan to go?'} subtitle={'make sure everyone is free'}/>
        <DatePicker value={dateRange} onChange={(value) => setDateRange(value.selection)} />
      </div>
    )
  }

  if(steps === STEPS.INFO){
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title={'More information'} subtitle={'Find your perfect place'} />
        <Counter value={guestCount} onChange={(value) => setGuestCount(value)} title="Guests" subtitle="How many guests are coming?" />
        <Counter value={bathroomCount} onChange={(value) => setBathroomCount(value)} title="Bathrooms" subtitle="How many bathrooms you need?" />
        <Counter value={roomCount} onChange={(value) => setRoomCound(value)} title="Rooms" subtitle="How many rooms you need?" />
      </div>
    )
  }

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
      actionLabel={actionLabel}
      SecondaryActionLabel={secondaryActionLabel}
      title={"filters"}
      body={bodyContent}
      secondaryAction={steps === STEPS.INFO ? undefined : onback}
    />
  );
}
