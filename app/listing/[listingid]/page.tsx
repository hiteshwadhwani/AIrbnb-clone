import getCurrentUser from "@/app/actions/getCurrentUser";
import { getListingWithId } from "@/app/actions/getListingWithId";
import ClientOnly from "@/app/components/clientOnlyProps";

import EmptyPage from "../../EmptyPage";
import ListingClient from "./ListingClient"

interface Iparams {
  listingid: string;
}

const ListingPage = async ({ params }: { params: Iparams }) => {
  const listing = await getListingWithId(params);
  const currentUser = await getCurrentUser();

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
        <ListingClient listing={listing} currentUser={currentUser} />
    </ClientOnly>
  );
};
export default ListingPage;
