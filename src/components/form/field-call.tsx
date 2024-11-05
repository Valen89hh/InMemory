"use client"
import { formatPhoneNumber } from "@/lib/utils/formater-call";
import { motion, AnimatePresence } from "framer-motion";
import React, { InputHTMLAttributes, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface PhoneNumberCallProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string|null;
    classNameContainer?: string,
    onChangeValue?: (phone: string)=>void,
    label?: string

}

const FieldCall: React.FC<PhoneNumberCallProps> = ({
    className,
    classNameContainer, 
    error, 
    onChangeValue,
    label,
    ...props 
})=>{
    const [isFocused, setIsFocused] = useState(false);
    const [countNumber, setCountNumber] = useState(0)

    const [phoneNumber, setPhoneNumber] = useState<string>(formatPhoneNumber(props.value?.toLocaleString() ?? ""));

    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatPhoneNumber(e.target.value);
        setPhoneNumber(formattedValue);
        if(onChangeValue) onChangeValue(formattedValue)
        if(props.onChange){
            const syntheticEvent = {
                target: {
                    name: props.name, // Para identificar el input si es necesario
                    value: formattedValue,
                }
            } as React.ChangeEvent<HTMLInputElement>;
            props.onChange(syntheticEvent);
        }
    };
    
    return (
        <AnimatePresence>
            <div className="w-full">
                {label && (
                    <label className={`font-medium ${error ? "text-red-500" : "text-primary"} text-lg`} htmlFor={props.id}>
                        {label}
                    </label>
                )}
                <div className={twMerge(`border-solid transition-all ${label && "mt-1"} bg-background px-4 py-2 rounded-ms border-2 space-y-1
                    ${error ? "border-red-500" : isFocused ? "border-primary" : "border-slate-e"}`, classNameContainer)}>
                    <input
                        maxLength={15}
                        className="outline-none bg-transparent transition-all w-full text-sm text-secondary-text"
                        {...props}
                        onChange={handleInputChange}
                        value={phoneNumber}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                </div>
                {error && <span className="text-red-500 text-sm">{error}</span>}

            </div>
        </AnimatePresence>
    );
}

export default FieldCall;