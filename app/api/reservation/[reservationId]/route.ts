import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

interface Iparams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: Iparams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string") {
    return new Error("Invalid ID");
  }

  const deleteReservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        { userId: currentUser.id },
        {
          listing: {
            userId: currentUser.id,
          },
        },
      ],
    },
  });
  return NextResponse.json(deleteReservation);
}
