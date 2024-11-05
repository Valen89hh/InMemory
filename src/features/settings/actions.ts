"use server"

import { createClient } from "@/lib/supabase/server"
import { SettingSchema } from "./hooks/use-setting-form"
import { Result } from "@/lib/utils/response"
import { Profile } from "@/lib/supabase/models"

export const updateProfile = async(data: SettingSchema): Promise<Result<Profile>>=>{
    const supabase = createClient()
    const {data: {user}} = await supabase.auth.getUser()
    if(!user) return {success: false, error: "Usuario no encontrado"}


    const {
        data: profile,
        error: errorProfile
    } = await supabase
        .from("profiles")
        .update({
            first_name: data.name,
            last_name: data.lastName,
            phone: data.phone,
            address: data.address,
            company: data.company,
            country: data.country,
            departament: data.departamento,
            province: data.provincia,
            district: data.distrito,
            avatar_path: data.image.path,
            avatar_url: data.image.url
        })
        .eq("id", user.id)
        .select()
        .maybeSingle()
    
    if(errorProfile) return {success: false, error: errorProfile.message}
    if(!profile) return {success: false, error: "No se puedo obtener el usuario"}

    return {
        success: true,
        data: profile
    }
}