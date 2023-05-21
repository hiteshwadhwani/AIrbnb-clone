'use client'

import useFavorites from '@/app/hooks/usefavorites'
import { SafeUser } from '@/app/types'
import React from 'react'
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'

interface heartButtonProps {
    listingID: string,
    currentUser?: SafeUser | null
}

const HeartButton: React.FC<heartButtonProps> = ({listingID, currentUser}) => {

    const {hasFavorite,
        toggleFavorite} = useFavorites({listingID, currentUser})
  return (
    <div onClick={toggleFavorite} className='relative hover:opacity-70 transition cursor-pointer'>
        <AiOutlineHeart size={26} className='fill-white absolute -top-[2px] -right-[2px]' />
        <AiFillHeart size={24} className={`${hasFavorite ? 'fill-rose-500' : 'fill-neutral-500/70'}`} />
    </div>
  )
}
export default HeartButton
