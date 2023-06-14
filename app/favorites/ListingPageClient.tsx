'client only'

import Container from "../components/Components";
import ListingCard from "../components/listing/ListingCard";
import Heading from "../components/modals/Heading";
import { SafeUser, safeListing } from "../types";

interface ListingPageClientProps{
    listings: safeListing[];
    currentUser ?: SafeUser | null
}

const ListingPageClient: React.FC<ListingPageClientProps> = ({listings, currentUser}) => {
    return (
        <Container>
            <Heading title={'Favorites'} subtitle={'List of places you have favorites'} />
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                {listings.map((listing) => (
                    <ListingCard currentUser={currentUser} data={listing} key={listing.id} />
                ))}
            </div>
        </Container>
    )
}
export default ListingPageClient