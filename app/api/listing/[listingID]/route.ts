import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export interface Iparams{
    listingID: string
}

export const DELETE = async (req:Request, {params} : {params: Iparams}) => {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        throw NextResponse.error()
    }

    const {listingID} = params
    if(!listingID || typeof listingID !== 'string'){
        throw new Error("Invalid ID")
    }

    const listing = await prisma.listing.deleteMany({
        where:{
            id: listingID,
            userId: currentUser.id
        }
    })
    return NextResponse.json(listing)
}