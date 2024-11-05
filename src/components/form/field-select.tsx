"use client"
import { useOutsideClick } from "@/hooks/use-outside-click";
import { capitalizeFirstLetter } from "@/lib/utils/formatter-string";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React, { InputHTMLAttributes, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";


export interface FieldOption{
    key: string
    value: string
}

interface FieldSelectProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string | null;
    options: FieldOption[],
    label?: string;
    onChangeOption?: (key: string)=>void
    classNameContainer?: string
}

const FieldSelect: React.FC<FieldSelectProps> = ({
    className,
    defaultValue,
    classNameContainer, 
    error, 
    label,
    onChangeOption, 
    options, 
    ...props 
})=>{
    const [isFocused, setIsFocused] = useState(false);
    const refDiv = useOutsideClick<HTMLDivElement>(() => setIsFocused(false));


    const handleContainerClick = () => {
        setIsFocused(!isFocused);
    };

    const handleSelectOption = (opt: FieldOption)=>{
        if(onChangeOption) onChangeOption(opt.key)
        // Llamar a props.onChange si está definido
        if (props.onChange) {
            const syntheticEvent = {
                target: {
                    name: props.name, // Para identificar el input si es necesario
                    value: opt.value,
                }
            } as React.ChangeEvent<HTMLInputElement>;
            props.onChange(syntheticEvent);
        }

        setIsFocused(false); 
    }
    
    return (
        <AnimatePresence>
            <div className=" relative" ref={refDiv}>
                {label && (
                    <label className={`font-medium ${error ? "text-red-500" : "text-primary"} text-lg`} htmlFor={props.id}>
                        {label}
                    </label>
                )}
                <motion.div
                    onClick={handleContainerClick} 
                    className={twMerge(`border-solid transition-all flex justify-between items-center ${label && "mt-1"} bg-background px-4 py-2 rounded-ms border-2 space-y-1
                        ${error ? "border-red-500" : isFocused ? "border-primary" : "border-slate-e"}`, classNameContainer)}
                >
                    <input 
                        readOnly
                        className={twMerge("outline-none bg-transparent w-full border-none text-black", className)} 
                        {...props} 
                        value={capitalizeFirstLetter(props.value?.toLocaleString()??"")}
                    />
                    <ChevronDown size={16} className="text-gris"/>
                </motion.div> 
                {error && <span className="text-red-500 text-sm">{error}</span>}
                <motion.ul
                    initial={{opacity: 0, zIndex: -10}}
                    animate={isFocused ? {opacity: 1, zIndex: 20} : {opacity: 0, zIndex: -10}}
                    transition={{duration: 0.15}} 
                    className={`${error ? "mt-0" : "mt-2"} overflow-x-hidden shadow-md border-solid border-border border-2 overflow-y-auto z-[20] absolute origin-bottom-left max-h-[10rem] bg-white rounded-md  w-full`}>
                    {options.map((opt, i)=>(
                        <li onClick={()=>handleSelectOption(opt)} key={opt.key} className={`hover:bg-primary hover:text-white cursor-pointer  transition-colors px-2 py-1 text-sm`}>
                            {capitalizeFirstLetter(opt.value)}
                        </li>
                    ))}
                    {options.length === 0 && (
                        <li onClick={()=>setIsFocused(false)} className={`hover:bg-primary hover:text-white cursor-pointer  transition-colors px-2 py-1 text-sm`}>
                            {props.placeholder}
                        </li>
                    )}
                </motion.ul>
            </div>
        </AnimatePresence>
    );
}


export default FieldSelect;