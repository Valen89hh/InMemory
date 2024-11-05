"use client"

import React, { ChangeEvent, InputHTMLAttributes, useRef, useState, useTransition } from "react";
import AddPhotoIcon from "../icons/add-photo-icon";
import EditIcon from "../icons/edit-icon";
import { twMerge } from "tailwind-merge";
import CircularProgress from '@mui/material/CircularProgress';
import { DataResultUpload, deleteFilesStorage, uploadImageBiography } from "@/features/biographies/actions";
import toast from "react-hot-toast";
import { useProfileState } from "@/lib/storage/auth-storage";

interface SelectImageProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string | null;
    classNameContainer?: string
    onChangeImage: (data: DataResultUpload)=>void,
    shape?: "circle" | "square",
    dataImage?: DataResultUpload,
    loading?: boolean,
    progressUpload?: number
}


const SelectImage: React.FC<SelectImageProps> = ({ 
    className,
    classNameContainer, 
    error, 
    onChangeImage, 
    dataImage = {
        url: "",
        path: ""
    }, 
    loading = false, 
    progressUpload = 0,shape = 
    "square", ...props 
})=>{

    const fileInputRef = useRef<HTMLInputElement>(null)
    const {profile} = useProfileState()
    const [dataImageUplaod, setDataImageUpload] = useState<DataResultUpload>(dataImage)
    const [loadingUpload, startLoadingUpload] = useTransition()


    const handleClickFile = ()=>{
        if(fileInputRef && !loading){
            fileInputRef.current?.click()
        }
    }

    const handleImageSelected = (e: ChangeEvent<HTMLInputElement>)=>{
        const files = e.target.files
        console.log(files)
        if(files && files.length > 0 && profile){
            if(dataImageUplaod.path){
                deleteFilesStorage("biography", dataImageUplaod, "image")
            }
            setDataImageUpload({
                url: URL.createObjectURL(files[0]),
                path: "",
            })
            startLoadingUpload(async()=>{
                const formData = new FormData()
                formData.append("file", files[0])
                const result = await uploadImageBiography(formData, profile.id)
                if(result.success) {
                    setDataImageUpload(result.data)
                    onChangeImage(result.data)
                }else{
                    toast.error(result.error)
                    const dataResult = {
                        url: "",
                        path: ""
                    }
                    setDataImageUpload(dataResult)
                    onChangeImage(dataResult)
                }
            })
        }
    }

    return ( 
        <div className={classNameContainer}>
            <div className={twMerge(`${shape == "circle" && "rounded-full"} ${shape == "square" && "rounded-none"} border-dashed border-2 border-gray-dark h-[20rem] w-[20rem] relative cursor-pointer`, className)}>
                <input ref={fileInputRef} onChange={handleImageSelected} className="hidden" type="file" accept="image/*" {...props}/>
                {dataImageUplaod.url ? (
                    <>
                        <img src={dataImageUplaod.url} alt="" className={`w-full ${shape == "circle" && "rounded-full"} ${shape == "square" && "rounded-none"} h-full object-cover `}/>
                        <div onClick={handleClickFile} className={`${shape == "circle" && "rounded-full"} ${shape == "square" && "rounded-none"} w-full group  transition-all  hover:bg-[#0000006b]  absolute inset-0 h-full justify-center items-center flex`}>
                            <EditIcon className="transition-all opacity-0 group-hover:opacity-100" width={40} height={40}/>
                        </div>
                    </>
                ): (
                    <div onClick={handleClickFile} className={`${shape == "circle" && "rounded-full"} ${shape == "square" && "rounded-none"} w-full h-full justify-center items-center flex`}>
                        <AddPhotoIcon width={40} height={40} color="#757575"/>
                    </div>
                )}

                {loadingUpload && (
                    <div className="absolute text-white flex-col gap-2 flex justify-center items-center cursor-progress inset-0 bg-black bg-opacity-20">
                        <CircularProgress color="inherit" />
                        <span>Subiendo imagen</span>
                    </div>
                )}
            </div>
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
}

 
export default SelectImage;