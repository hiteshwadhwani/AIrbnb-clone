'use client'

import React, { useEffect } from "react"
import EmptyPage from "./EmptyPage"

interface ErrorStateProps{
    error?: Error
}

const ErrorState : React.FC<ErrorStateProps> = ({error}) => {
    useEffect(() => {
        console.log(error)
    }, [error])

    return (
        <EmptyPage title="Uh no" subtitle="Something went wrong" />
    )
}
export default ErrorState