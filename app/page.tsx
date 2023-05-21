import Container from "../app/components/Components"
import { Inter } from "next/font/google";
import ClientOnly from "./components/clientOnlyProps";
import getCurrentUser from "./actions/getCurrentUser";
import EmptyPage from "./EmptyPage"
import { getListings } from "./actions/getListings";
import ListingCard from "../app/components/listing/ListingCard"

const inter = Inter({ subsets: ["latin"] });

// interface HomeProps{
//   searchParams: string
// }

const Home = async () => {
  const listings = await getListings()
  const currentUser = await getCurrentUser()

  if(listings.length === 0){
    return(
      <EmptyPage />
    )
  }

  return (
    <ClientOnly>
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((item) => (
          <div key={item.title}>
            <ListingCard currentUser={currentUser} data={item}/>
          </div>
        ))}
      </div>
    </Container>
    </ClientOnly>
  );
}
export default Home
