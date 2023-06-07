"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Avatar from "../Avatar";
import Map from "../Map";
import { IconType } from "react-icons";
import ListingCategory from "./ListingCategory";

interface ListingInfoProps {
  user?: SafeUser | null;
  category ?: {
    label: string;
    icon: IconType;
    description: string;
  };
  description: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  bathroomCount,
  guestCount,
  locationValue,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue)?.latlng;
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted By {user?.name}</div>
          <div>
            <Avatar src={user?.image} />
          </div>
        </div>
        <div className="flex-row items-center gap-4 flex font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory icon={category.icon} label={category.label} description={category.description} />
      )}
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={location} />
    </div>
  );
};
export default ListingInfo;
