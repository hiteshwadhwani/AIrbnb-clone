import ClientOnly from "../components/clientOnlyProps"
import EmptyPage from "../EmptyPage"
import {getFavoriteListings} from '@/app/actions/getFavoriteListings'
import getCurrentUser from "../actions/getCurrentUser"

import ListingPageClient from "./ListingPageClient"


const ListingPage = async () => {
    const listings = await getFavoriteListings()
    const currentUser = await getCurrentUser()

    if(listings.length === 0){
        return (
            <ClientOnly>
                <EmptyPage title="No favorites found" subtitle="Looks like you have no facorites listing"/>
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <ListingPageClient listings={listings} currentUser={currentUser} />
        </ClientOnly>
    )
}
export default ListingPage