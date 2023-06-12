"use client";

import React, { useCallback, useState } from "react";
import Container from "../components/Components";
import { SafeUser, safeReservation } from "../types";
import Heading from "../components/modals/Heading";
import ListingCard from "../components/listing/ListingCard";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface reservationClientProps {
  reservations: safeReservation[];
  currentUser?: SafeUser | null;
}

const ReservationClient: React.FC<reservationClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios
      .delete(`/api/reservation/${id}`)
      .then((res) => {
        toast.success("reservation canceled");
        router.refresh();
      })
      .catch(() => toast.error("something went wrong"))
      .finally(() => {
        setDeletingId("");
      });
  }, []);
  return (
    <Container>
      <Heading title={"reservations"} subtitle={"Booking on your properties"} />
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionID={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};
export default ReservationClient;
