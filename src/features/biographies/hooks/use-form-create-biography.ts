import { useFormFields, Validators } from "@/hooks/use-form-fields";
import { createBiography, DataResultUpload } from "../actions";
import { useTransition } from "react";
import { Dayjs } from "dayjs";
import { MessagesState } from "./use-messages";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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

export function useFormCreateBiography(){
    const router = useRouter()
    const [loadingCreate, startLoadingCreate] = useTransition()
    const {fields, handleSubmit, setFieldValue} = useFormFields<BiographySchema>({
        namePerson: "",
        dateOfBirth: null,
        dateOfDeath: null,
        description: "",
        messageMain: "",
        imagePerson: {
            url: "",
            path: ""
        },   
        photos: [],
        videos: [],
        messages: []
    }, validators)

    const onSubmit = (data: BiographySchema)=>{
        startLoadingCreate(async()=>{
            const result = await createBiography({
                namePerson: data.namePerson,
                description: data.description,
                photoPerson: data.imagePerson,
                mainMessage: data.messageMain,
                photos: data.photos,
                videos: data.videos,
                messages: data.messages,
                dateOfBirth: data.dateOfBirth!.toDate(),
                dateOfDeath: data.dateOfDeath!.toDate()
            })
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