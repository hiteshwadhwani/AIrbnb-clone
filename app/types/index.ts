import { User, Listing, Reservation } from "@prisma/client";
import { type } from "os";

export type SafeUser = Omit<
  User,
  "emailverified" | "createdAt" | "updatedAt"
> & {
  createdAt: string;
  updatedAt: string;
  emailverified: string | null;
};

export type safeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type safeReservation = Omit<
  Reservation,
  "startDate" | "endDate" | "createAt" | "listing"
> & {
  startDate: string;
  endDate: string;
  createAt: string;
  listing: safeListing
};