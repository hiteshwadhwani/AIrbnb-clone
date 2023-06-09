import prisma from "../libs/prismadb";

interface Iparams {
    listingid?: string;
  userId?: string;
  authorId?: string;
}

const getReservations = async (params: Iparams) => {
  try {
    const { listingid, userId, authorId } = params;

    const query: any = {};

    if (listingid) {
      query.listingId = listingid;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.userId = authorId;
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createAt: "desc",
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      createAt: reservation.createAt.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getReservations;
