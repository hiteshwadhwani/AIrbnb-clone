import getCurrentUser from "./getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../libs/prismadb";

const getListings = async () => {
  try {
    const listings = await prisma.listing.findMany();
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
