"use client";

import Container from "@/app/components/Components";
import ListingHead from "@/app/components/listing/ListingHead";
import ListingInfo from "@/app/components/listing/ListingInfo";
import ListingReservation from "@/app/components/listing/ListingReservation"

import { categories } from "@/app/components/navbar/categories";
import { safeListing, SafeUser } from "@/app/types";
import {Range} from 'react-date-range'

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { Reservation } from "@prisma/client";
import useLoginModal from "@/app/hooks/useLoginModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";



interface listingClientProps {
  reservations?: Reservation[];
  listing: safeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<listingClientProps> = ({
  listing,
  currentUser,
  reservations = [],
}) => {
  const loginModal = useLoginModal();

  const router = useRouter();

  const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [totalPrice, setTotalPrice] = useState(listing.price);

  useEffect(() => {
    if (dateRange.endDate && dateRange.startDate) {
      const diff = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (diff && listing.price) {
        setTotalPrice(diff * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setLoading(true);

    axios
      .post("/api/reservation", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
      })
      .then((res) => {
        toast.success("Reservation Done");
        // redirect to /trip
        setDateRange(initialDateRange);
        router.refresh();
      })
      .catch((error: any) => {
        toast.error("Something went wrong");
      })
      .finally(() => setLoading(false));
  }, [
    currentUser,
    totalPrice,
    dateRange,
    listing,
    loginModal,
    router
  ]);

  const category = useMemo(() => {
    return categories.find((category) => category.label === listing.category);
  }, [listing.category]);

  const disableDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 mt-6 gap-3">
            <ListingInfo
              user={currentUser}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              bathroomCount={listing.bathroomCount}
              guestCount={listing.guestCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation price={listing.price} totalPrice={totalPrice} onChangeDate={(value:Range) => setDateRange(value)} dateRange={dateRange} onSubmit={onCreateReservation} disabled={loading} disabledDates={disableDates} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default ListingClient;
