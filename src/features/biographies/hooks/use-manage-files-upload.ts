import { ChangeEvent, useEffect, useRef, useState, useTransition } from "react";
import { DataResultUpload, deleteFilesStorage, uploadFileBiography } from "../actions";
import { useProfileState } from "@/lib/storage/auth-storage";
import toast from "react-hot-toast";

export function useManageFilesUpload(dataUploads: DataResultUpload[] = [], typeManage: "image" | "video", onChangeFileUpload: (filesUpload: DataResultUpload[])=>void){
    const {profile} = useProfileState()
    const [filesUpload, setFilesUpload] = useState(dataUploads)
    const [loadingUpload, startLoadingUpload] = useTransition()
    const [loadingDelete, startLoadingDelete] = useTransition()
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClickFile = ()=>{
        if(fileInputRef.current){
            fileInputRef.current.click()
        }
    }

    useEffect(()=>{
        onChangeFileUpload(filesUpload)
    }, [filesUpload])

    const handleFileSelected = (e: ChangeEvent<HTMLInputElement>)=>{
        const files = e.target.files
        if(profile && files && files.length > 0){
            startLoadingUpload(async()=>{
                //subimos el archivo
                const formData = new FormData()
                formData.append("file", files[0])
                const result = await uploadFileBiography(
                    "biography",
                    formData,
                    profile.id,
                    typeManage
                )
                if(result.success){
                    setFilesUpload(prev=>[...prev, result.data])
                }
                else toast.error(result.error)
            })
        }
    }

    const handleFileDelete = (file: DataResultUpload)=>{
        startLoadingDelete(async()=>{
            const result = await deleteFilesStorage("biography", file, typeManage)
            if(result.success){
                setFilesUpload(prev=>prev.filter(fl=>fl.path !== file.path))
            } else{
                toast.error(result.error)
            }
        })
    }

    return{
        handleFileDelete,
        handleClickFile,
        fileInputRef,
        handleFileSelected,
        loadingDelete,
        loadingUpload,
        filesUpload
    }
}