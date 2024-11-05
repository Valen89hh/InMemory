"use client"

import React, { InputHTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";



interface FieldProps extends InputHTMLAttributes<HTMLInputElement>{
  error?: string | null,
  label?: string
  classNameContainer?: string
}

const Field: React.FC<FieldProps> = ({
  className,
  classNameContainer,
  error,
  label,
  ...props
}) => {
  const [isFocus, setIsFocus] = useState(false)
  return (
    <div className="w-full">
        {label && (
            <label className={`font-medium ${error ? "text-red-500" : "text-primary"} text-lg`} htmlFor={props.id}>
                {label}
            </label>
        )}
        <div className={twMerge(`border-solid transition-all ${label && "mt-1"} bg-background px-4 py-2 rounded-ms border-2 space-y-1
            ${error ? "border-red-500" : isFocus ? "border-primary" : "border-slate-e"}`, classNameContainer)}>
            <input 
                className={twMerge("outline-none bg-transparent w-full border-none text-black", className)} 
                {...props} 
                onFocus={()=>setIsFocus(true)}
                onBlur={()=>setIsFocus(false)}
            />
        </div>
        {error && (<span className="text-red-500 text-sm" >{error}</span>)}
    </div>
  );
}


Field.displayName = "Field";

export default Field;
