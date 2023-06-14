//actions
import getCurrentUser from "../actions/getCurrentUser"
import { getListings } from "../actions/getListings"
import getReservations from "../actions/getReservations"

//components
import ClientOnly from "../components/clientOnlyProps"
import EmptyPage from "../EmptyPage"
import PropertiesClient from './PropertiesClient'


const PropertiesPage = async () => {
    const currentUser = await getCurrentUser()
    const properties = await getListings({userId: currentUser?.id})
    

    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyPage title="You are not authorized" subtitle="please log in" />
            </ClientOnly>
        )
    }


    
    
    if(properties.length === 0){
        return (
            <ClientOnly>
                <EmptyPage title="No Properties Registered" />
            </ClientOnly>
        )
    }

    return (
        <PropertiesClient properties={properties} currentUser={currentUser} />
    )
}
export default PropertiesPage