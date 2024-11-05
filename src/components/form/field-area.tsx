"use client"

import React, { InputHTMLAttributes, TextareaHTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";



interface FieldAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
  error?: string | null,
  label?: string
  classNameExternalContainer?: string,
  classNameContainer?: string

}

const FieldArea: React.FC<FieldAreaProps> = ({
  className,
  classNameContainer,
  classNameExternalContainer,
  error,
  label,
  ...props
}) => {
  const [isFocus, setIsFocus] = useState(false)
  return (
    <div className={twMerge("flex flex-col", classNameExternalContainer)}>
        {label && (
            <label className={`font-medium ${error ? "text-red-500" : "text-primary"} text-lg`} htmlFor={props.id}>
                {label}
            </label>
        )}
        <div className={twMerge(twMerge(`border-solid transition-all h-full ${label && "mt-1"} bg-background px-4 py-2 rounded-ms border-2 space-y-1
            ${error ? "border-red-500" : isFocus ? "border-primary" : "border-slate-e"}`, classNameContainer))}>
            <textarea 
                className={twMerge("outline-none resize-none min-h-20 bg-transparent w-full border-none text-black", className)} 
                {...props} 
                onFocus={()=>setIsFocus(true)}
                onBlur={()=>setIsFocus(false)}
            ></textarea>
        </div>
        {error && (<span className="text-red-500 text-sm" >{error}</span>)}
    </div>
  );
}


FieldArea.displayName = "FieldArea";

export default FieldArea;
