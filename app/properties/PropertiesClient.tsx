'use client'

import React, { useCallback, useState } from "react";
import { SafeUser, safeListing, safeReservation } from "../types";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Container from "../components/Components";
import Heading from "../components/modals/Heading";
import ListingCard from "../components/listing/ListingCard";

interface PropertiesClientProps {
    properties: safeListing[];
  currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
    properties,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/listing/${id}`)
        .then((res) => {
          toast.success("Property Removed");
          router.refresh();
        })
        .catch((error) => toast.error(error?.response?.data?.error))
        .finally(() => setDeletingId(""));
    },
    [router]
  );
  return (
    <Container>
      <Heading
        title={"Properties"}
        subtitle={"Your Listed Properties"}
      />
      <div className="mt-10 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {properties.map((property) => (
          <ListingCard
            key={property.id}
            data={property}
            actionID={property.id}
            onAction={onCancel}
            disabled={deletingId === property.id}
            actionLabel="Remove property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};
export default PropertiesClient;
