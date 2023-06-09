import getCurrentUser from "@/app/actions/getCurrentUser";
import { getListingWithId } from "@/app/actions/getListingWithId";
import getReservations from "@/app/actions/getReservations";
import ClientOnly from "@/app/components/clientOnlyProps";

import EmptyPage from "../../EmptyPage";
import ListingClient from "./ListingClient"

interface Iparams {
  listingid: string;
}

const ListingPage = async ({ params }: { params: Iparams }) => {
  const listing = await getListingWithId(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params)

  console.log(listing)

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyPage />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
        <ListingClient reservations={reservations} listing={listing} currentUser={currentUser} />
    </ClientOnly>
  );
};
export default ListingPage;
