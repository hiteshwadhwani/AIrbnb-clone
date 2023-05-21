import axios from "axios";
import { SafeUser } from "../types";
import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";
import { useMemo, useCallback } from "react";
import { toast } from "react-hot-toast";

interface IuseFavorites {
  currentUser?: SafeUser | null;
  listingID: string;
}

const useFavorites = ({ currentUser, listingID }: IuseFavorites) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingID);
  }, [currentUser, listingID]);
  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }
      try {
        let request;

        if (hasFavorite) {
          request = () => axios.delete(`/api/favorites/${listingID}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingID}`);
        }
        await request();
        router.refresh();
        if (hasFavorite) {
          toast.success("removed");
        } else {
        toast.success("favorite added");
        }
      } catch (error: any) {
        console.log(error);
        toast.error("something went wrong");
      }
    },
    [currentUser, hasFavorite, listingID, loginModal, router]
  );
  return {
    hasFavorite,
    toggleFavorite,
  };
};
export default useFavorites;
