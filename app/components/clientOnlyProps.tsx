'use client'

import {useState, useEffect} from 'react'

interface ClientOnlyProps {
    children:React.ReactNode
}

const ClientOnly:React.FC<ClientOnlyProps> = ({children}) => {
    const [hasMounted, SetHasMounted] = useState(false)
    useEffect(() => {
        SetHasMounted(true)
    }, [])

    if(hasMounted == false){
        return null
    }
    return (
        <>
            {children}
        </>
    )

}

export default ClientOnly