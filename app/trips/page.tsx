//actions
import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"

//components
import ClientOnly from "../components/clientOnlyProps"
import EmptyPage from "../EmptyPage"
import TripsClient from './TripsClient'


const TripsPage = async () => {
    const currentUser = await getCurrentUser()
    const reservations = await getReservations({userId: currentUser?.id})

    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyPage title="You are not authorized" subtitle="please log in" />
            </ClientOnly>
        )
    }

    console.log(reservations)
    if(reservations.length === 0){
        return (
            <ClientOnly>
                <EmptyPage title="No Trips available" />
            </ClientOnly>
        )
    }

    return (
        <TripsClient reservations={reservations} />
    )
}
export default TripsPage