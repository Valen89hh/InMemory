import { useFormFields, Validators } from "@/hooks/use-form-fields";
import { createBiography, DataResultUpload, updateBiography } from "../actions";
import { useTransition } from "react";
import dayjs, { Dayjs } from "dayjs";
import { MessagesState } from "./use-messages";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BiographyForEdit } from "@/lib/supabase/models";
import { generateUUID } from "@/lib/utils/generator-uuid";

interface BiographySchema{
    namePerson: string,
    dateOfBirth: Dayjs | null,
    dateOfDeath: Dayjs | null,
    description: string,
    messageMain: string,
    imagePerson: DataResultUpload,
    photos: DataResultUpload[],
    videos: DataResultUpload[],
    messages: MessagesState[]
}

const validators: Validators<BiographySchema> = {
    namePerson: (value)=>!value ? "El nombre de la persona es requrido" : null,
    dateOfBirth: (value, {dateOfDeath})=>{
        if(!value) return "La fecha de nacimiento es requerido"
        
        if(dateOfDeath){
            if(value > dateOfDeath) return "La fecha de nacimiento debe ser menor a la fecha de fallecmiento"
        }
        
        return null
    },
    dateOfDeath: (value, {dateOfBirth})=>{
        if(!value) return "La fecha de fallecimiento es requerido"
        
        if(dateOfBirth){
            if(value < dateOfBirth) return "La fecha de fallecimiento debe ser mayor a la fecha de nacimiento"
        }
        
        return null
    },
    description: (value)=>!value ? "La descripción es requerida" : null,
    messageMain: (value)=>!value ? "El mensaje es requerido" : null,
    imagePerson: (value)=>{
        if(!value.path && !value.url) return "La imagen es requerida"
        else return null
    },
    photos: (value)=>null,
    videos: (value)=>null,
    messages: (value)=>null,
}

export function useFormEditBiography(biography: BiographyForEdit){
    const router = useRouter()
    const [loadingCreate, startLoadingCreate] = useTransition()
    const {fields, handleSubmit, setFieldValue} = useFormFields<BiographySchema>({
        namePerson: biography.name_person,
        dateOfBirth: dayjs(biography.date_of_birth),
        dateOfDeath: dayjs(biography.date_of_death),
        description: biography.descrption,
        messageMain: biography.main_message,
        imagePerson: {
            url: biography.photo_person,
            path: biography.photo_path,
        },   
        photos: biography.photos.map(img=>({
            url: img.image_url,
            path: img.image_path,
            idDb: img.id
        })),
        videos: biography.videos.map(video=>({
            url: video.video_url,
            path: video.video_path,
            idDb: video.id
        })),
        messages: biography.messages.map(msg=>({
            id: msg.id,
            content: msg.message_text,
            isNew: false
        }))
    }, validators)

    const onSubmit = (data: BiographySchema)=>{
        startLoadingCreate(async()=>{
            const result = await updateBiography({
                namePerson: data.namePerson,
                description: data.description,
                photoPerson: data.imagePerson,
                mainMessage: data.messageMain,
                photos: data.photos,
                videos: data.videos,
                messages: data.messages,
                dateOfBirth: data.dateOfBirth!.toDate(),
                dateOfDeath: data.dateOfDeath!.toDate()
            }, biography.id)
            if(result.success){
                toast.success(result.data)
                router.push("/dashboard/biographies")
            }else{
                toast.error(result.error)
            }
        })
    }

    const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        handleSubmit(e, onSubmit)
    }

    return {
        fields,
        loadingCreate,
        onHandleSubmit,
        setFieldValue
    }
}