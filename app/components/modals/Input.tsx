import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import {BiDollar} from 'react-icons/bi'
interface InputProps {
    id:string;
    label:string;
    type ?: string;
    disabled ?: boolean
    formatPrice ?: boolean;
    required ?: boolean;
    register : UseFormRegister<FieldValues>
    errors : FieldErrors
}

const Input:React.FC<InputProps> = ({
    id, label, type = 'text', disabled, formatPrice, required, register, errors
}) => {
    return (
        <div className='relative w-full'>
            {formatPrice && (
                <BiDollar size={24} className='text-neutral-700 top-5 absolute left-2' />
            )}
            <input id={id} disabled={disabled} {...register(id, {required})} placeholder=' ' />
        </div>
    )
}

export default Input
