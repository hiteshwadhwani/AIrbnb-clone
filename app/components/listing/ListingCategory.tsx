import React from "react";
import { IconType } from "react-icons";

interface listingCategoryProps{
    label: string;
    icon: IconType;
    description: string;
}

const ListingCategory: React.FC<listingCategoryProps> = ({label, icon: Icon, description}) => {
    return (
        <div className="">
            <div className="flex flex-row gap-2 items-center">
                <Icon size={40} className="text-neutral-600" />
                <div className="flex flex-col justify-start">
                    <div className="text-lg font-semibold">
                        {label}
                    </div>
                    <div className="text-neutral-500 font-light">
                        {description}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ListingCategory