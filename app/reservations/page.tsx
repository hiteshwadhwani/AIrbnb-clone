//actions
import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"


//components
import ClientOnly from "../components/clientOnlyProps"
import ReservationClient from "./ReservationClient"
import EmptyPage from "../EmptyPage"

const ReservationPage = async () => {
    const currentUser = await getCurrentUser()
    const reservations = await getReservations({authorId: currentUser?.id})

    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyPage title="Unauthorized" subtitle="Please Login" />
            </ClientOnly>
        )
    }

    if(reservations.length === 0){
        return (
            <ClientOnly>
                <EmptyPage title="No reservations" subtitle="Looks like there is no booking at your location" />
            </ClientOnly>
        )
    }


    return (
        <ReservationClient reservations={reservations} currentUser={currentUser} />
    )
}
export default ReservationPage