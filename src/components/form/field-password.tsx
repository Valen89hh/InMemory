"use client"

import { AnimatePresence, motion } from "framer-motion";
import React, { InputHTMLAttributes, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Eye, EyeOff } from 'lucide-react';



interface FieldPasswordProps extends InputHTMLAttributes<HTMLInputElement>{
  error?: string | null,
  label?: string
  classNameContainer?: string
}

const FieldPassword: React.FC<FieldPasswordProps> = ({
  className,
  classNameContainer,
  error,
  label,
  ...props
}) => {
    const refInput = useRef<HTMLInputElement>(null)

    const [isFocus, setIsFocus] = useState(false)
    const [visiblePassword, setVisiblePassword] = useState(true)

    const handleClickVisiblePassoword = ()=>{
        if(refInput.current){
            refInput.current.focus()
        }
    }

    return (
        <div className={classNameContainer}>
            {label && (
                <label className={`font-medium ${error ? "text-red-500" : "text-primary"} text-lg`} htmlFor={props.id}>
                    {label}
                </label>
            )}
            <div className={`border-solid transition-all ${label && "mt-1"} bg-background px-4 py-2 rounded-ms flex items-center gap-2 border-2 space-y-1
                ${error ? "border-red-500" : isFocus ? "border-primary" : "border-slate-e"}`}>
                <input 
                    ref={refInput}
                    className={twMerge("outline-none bg-transparent w-full border-none text-black", className)} 
                    {...props} 
                    type={visiblePassword ? "password" : "text"}
                    onFocus={()=>setIsFocus(true)}
                    onBlur={()=>setIsFocus(false)}
                />
                <AnimatePresence>
                    {visiblePassword ? (
                        <motion.button
                            className="text-primary"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            type="button"
                            onClick={()=>{
                                handleClickVisiblePassoword()
                                setVisiblePassword(false)
                            }}
                        >
                            <EyeOff size={20}/>
                        </motion.button>
                    ): (
                        <motion.button
                            className="text-primary"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            type="button"
                            onClick={()=>{
                                handleClickVisiblePassoword()
                                setVisiblePassword(true)
                            }}
                        >
                            <Eye size={20}/>
                        </motion.button>

                    )}
                </AnimatePresence>
            </div>
            {error && (<span className="text-red-500 text-sm" >{error}</span>)}
        </div>
    );
}


FieldPassword.displayName = "FieldPassword";

export default FieldPassword;
