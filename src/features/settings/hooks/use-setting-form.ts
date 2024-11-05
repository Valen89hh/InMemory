import { DataResultUpload } from "@/features/biographies/actions";
import { useFormFields, Validators } from "@/hooks/use-form-fields";
import { useProfileState } from "@/lib/storage/auth-storage";
import { Profile } from "@/lib/supabase/models";
import { isPhoneNumber } from "@/lib/utils/regex-format";
import { useTransition } from "react";
import { updateProfile } from "../actions";
import toast from "react-hot-toast";

export interface SettingSchema{
    name: string,
    lastName: string,
    email: string,
    phone: string,
    image: DataResultUpload,
    departamento: string,
    provincia: string,
    distrito: string,
    country: string,
    company: string,
    address: string,
}

const validators: Validators<SettingSchema> = {
    name: (value)=>!value ? "El nombre es requerido" : null,
    lastName: (value)=> !value ? "Los apellidos son requeridos" : null,
    email: (value)=>null,
    address: (value)=> !value ? "La dirección es requerida" : null,
    phone: (value)=>{
        if(!value) return "El telefono es requerido"
        else if(!isPhoneNumber(value)) return "El telefono es invalido"
        else return null
    },
    departamento: (value)=> !value ? "El departamento es requerido" : null,
    distrito: (value)=> !value ? "El distrito es requerido" : null,
    provincia: (value)=> !value ? "La provincia es requerida" : null,
    country: (value)=> !value ? "El país es querido" : null,
    company: (value)=> null,
    image: (value)=>null


}

export function useSettingForm(profile: Profile){
    const {setProfile} = useProfileState()
    const [loadingSave, startLoadingSave] = useTransition()
    const {fields, setFieldValue, handleSubmit} = useFormFields<SettingSchema>({
        name: profile.first_name,
        lastName: profile.last_name ?? "",
        email: profile.email,
        phone: profile.phone ?? "",
        image: {
            url: profile.avatar_url ?? "",
            path: profile.avatar_path ?? ""
        },
        departamento: profile.departament ?? "",
        provincia: profile.province ?? "",
        distrito: profile.district ?? "",
        country: profile.country ?? "",
        company: profile.company ?? "",
        address: profile.address ?? ""
    }, validators)


    const onSubmit = (data: SettingSchema)=>{
        startLoadingSave(async()=>{
            const result = await updateProfile(data)
            if(result.success) {
                setProfile(result.data)
                toast.success("Perfil actualizado correctamente")
            }
            else toast.error(result.error)
        })
    }

    const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        handleSubmit(e, onSubmit)
    }

    return {
        onHandleSubmit,
        fields, 
        setFieldValue,
        loadingSave
    }
}