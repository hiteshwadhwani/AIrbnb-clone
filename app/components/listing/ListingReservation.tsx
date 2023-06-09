'use client'

import React from 'react'
import {Range} from 'react-date-range'

//components
import DatePicker from "../Input/Calendar"
import Button from '../modals/Button'

interface ListingReservationProps{
    price: number,
    totalPrice: number,
    onChangeDate: (value: Range) => void,
    dateRange: Range
    onSubmit : () => void
    disabled: boolean
    disabledDates: Date[]
}

const ListingReservation: React.FC<ListingReservationProps> = ({price,totalPrice,onChangeDate,dateRange,onSubmit ,disabled,disabledDates}) => {
    return (
        <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
            <div className='flex flex-col items-center gap-1 p-4'>
                <div>$ {price}</div>
                <div>night</div>
            </div>
            <hr />
            <DatePicker value={dateRange} disabledDates={disabledDates} onChange={(value) => onChangeDate(value.selection)} />
            <hr />
            <Button label={'reserve'} onCLick={onSubmit} />
            <div className='flex flex-row justify-between p-4 items-center font-semibold text-lg'>
                <div>price</div>
                <div>{totalPrice}</div>
            </div>
        </div>
    )
}
export default ListingReservation