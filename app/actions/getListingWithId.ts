import prisma from "../libs/prismadb";

interface Iparams {
  listingid ?: string;
}

const getListingWithId = async (params: Iparams) => {
  try {
    const { listingid } = params;
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingid,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }
    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailverified: listing.user.emailVerified?.toISOString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export {getListingWithId}
