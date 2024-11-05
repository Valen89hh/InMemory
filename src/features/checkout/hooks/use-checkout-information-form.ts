import { useFormFields, Validators } from "@/hooks/use-form-fields"
import { Profile } from "@/lib/supabase/models"
import { isPhoneNumber, isValidEmail } from "@/lib/utils/regex-format"
import { useTransition } from "react"
import { useStateTabCheckout } from "../storage/tab-checkout-storage"
import { useCheckoutInformationState } from "../storage/checkout-information-storage"
import { useProfileState } from "@/lib/storage/auth-storage"
import { updateInformationProfile } from "../actions"
import toast from "react-hot-toast"

export interface CheckoutInformationSchema{
    email: string,
    pais: string,
    nombre: string,
    apellidos: string,
    empresa: string,
    direccion: string,
    departamento: string
    provincia: string,
    distrito: string,
    telefono: string
}

const validators: Validators<CheckoutInformationSchema> = {
    email(value) {
        if(!value) return "El email es requerido"
        else if(!isValidEmail(value)) return "El email no es valido"
        else return null
    },
    pais:(value)=> !value ? "El país es requerido" : null,
    nombre: (value)=> !value ? "El nombre es requerido" : null,
    apellidos: (value)=>!value ? "Los apellidos son requeridos" : null,
    empresa: (value)=> null,
    direccion: (value)=> !value ? "La dirección es requerido" : null,
    departamento: (value)=> !value ? "El departamento es requerido" : null,
    provincia: (value)=> !value ? "La provincia es requerida" : null,
    distrito: (value)=> !value ? "El distrito es requerido" : null,
    telefono(value){
        if(!value) return "El telefono es requerido"
        else if(!isPhoneNumber(value)) return "El telefono es invalido"
        else return null
    }

}


export function useCheckoutInformationForm(profile: Profile){
    const {setProfile} = useProfileState()
    const {setActiveTab} = useStateTabCheckout()
    const {information, setInformation} = useCheckoutInformationState()

    const [loadingSave, startLoadingSave] = useTransition()
    const {setFieldValue, fields, handleSubmit} = useFormFields<CheckoutInformationSchema>({
        email: profile.email,
        pais: profile.country ?? "",
        nombre: profile.first_name,
        apellidos: profile.last_name ?? "",
        empresa: profile.company ?? "",
        direccion: profile.address ?? "",
        departamento: profile.departament ?? "",
        provincia: profile.province ?? "",
        distrito: profile.district ?? "",
        telefono: profile.phone ?? "",
    }, validators)

    const onSubmit = (data: CheckoutInformationSchema)=>{
        startLoadingSave(async()=>{
            const result = await updateInformationProfile(data)
            if(result.success){
                setProfile(result.data)
                setActiveTab(1)
                setInformation(data)
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
        onHandleSubmit,
        setFieldValue,
        loadingSave
    }
}