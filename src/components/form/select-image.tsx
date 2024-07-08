"use client"

import React, { ChangeEvent, InputHTMLAttributes, useRef, useState } from "react";
import AddPhotoIcon from "../icons/add-photo-icon";
import EditIcon from "../icons/edit-icon";
import { twMerge } from "tailwind-merge";
import CircularProgress from '@mui/material/CircularProgress';

interface SelectImageProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    classNameContainer?: string
    onSelectFile: (param: File)=>void,
    shape?: "circle" | "square",
    src: string,
    loading?: boolean,
    progressUpload?: number
}


const SelectImage = React.forwardRef<HTMLInputElement, SelectImageProps> (
    ({ className,classNameContainer, error, onSelectFile, src = null, loading = false, progressUpload = 0,shape = "square", ...props }, ref )=>{

        const fileInputRef = useRef<HTMLInputElement>(null)


        const [imgSelect, setImgSelect] = useState<string|null>(src)


        const handleClickFile = ()=>{
            if(fileInputRef && !loading){
                fileInputRef.current?.click()
            }
        }

        const handleImageSelected = (e: ChangeEvent<HTMLInputElement>)=>{
            const files = e.target.files
            console.log(files)
            if(files && files.length > 0){
                setImgSelect(URL.createObjectURL(files[0]))
                onSelectFile(files[0])
            }
        }

        return ( 
            <div className={classNameContainer}>
                <div className={twMerge(`${shape == "circle" && "rounded-full"} ${shape == "square" && "rounded-none"} border-dashed border-2 border-gray-dark h-[20rem] w-[20rem] relative cursor-pointer`, className)}>
                    <input ref={fileInputRef} onChange={handleImageSelected} className="hidden" type="file" accept="image/*" {...props}/>
                    {imgSelect ? (
                        <>
                            <img src={imgSelect} alt="" className={`w-full ${shape == "circle" && "rounded-full"} ${shape == "square" && "rounded-none"} h-full object-cover `}/>
                            <div onClick={handleClickFile} className={`${shape == "circle" && "rounded-full"} ${shape == "square" && "rounded-none"} w-full group  transition-all  hover:bg-[#0000006b]  absolute inset-0 h-full justify-center items-center flex`}>
                                <EditIcon className="transition-all opacity-0 group-hover:opacity-100" width={40} height={40}/>
                            </div>
                        </>
                    ): (
                        <div onClick={handleClickFile} className={`${shape == "circle" && "rounded-full"} ${shape == "square" && "rounded-none"} w-full h-full justify-center items-center flex`}>
                            <AddPhotoIcon width={40} height={40} color="#757575"/>
                        </div>
                    )}

                    {loading && (
                        <div className="absolute text-white flex justify-center items-center cursor-progress inset-0 bg-[#0000006b]">
                            {progressUpload >= 100 ? (
                                <span>✅ Foto subida</span>
                            ): (
                                <CircularProgress color="inherit" variant="determinate" value={progressUpload} />
                            )}
                        </div>
                    )}
                </div>
                {error && <span className="text-red-500 text-sm">{error}</span>}
            </div>
        );
    }
)
 
export default SelectImage;