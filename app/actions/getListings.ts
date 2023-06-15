import getCurrentUser from "./getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../libs/prismadb";
import { SafeUser } from "../types";
import {CountrySelectValue} from '@/app/components/Input/CountrySelect'

export interface IListingParams{
  userId ?: string
  category?: string
  location ?: string,
  guestCount ?: number,
  roomCount ?: number,
  bathroomCount  ?: number,
  startDate ?: string,
  endDate ?: string
}

const getListings = async (params: IListingParams) => {
  try {

    const {userId, category, location, guestCount,
      roomCount,
      bathroomCount, startDate, endDate} = params

    let query : any = {}

    if(userId){
      query.userId = userId
    }

    if(category){
      query.category = category
    }

    if(location){
      query.locationValue = location
    }
    if(guestCount){
      query.guestCount = {
        gte: +guestCount
      }
    }
    if(roomCount){
      query.roomCount = {
        gte: +roomCount
      }
    }
    if(bathroomCount){
      query.bathroomCount = {
        gte: +bathroomCount
      }
    }
    if(startDate && endDate){
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate }
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate }
              }
            ]
          }
        }
      }
    }
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    return safeListings;
  } catch (error:any) {
    throw new Error(error)
  }
};

export { getListings };
