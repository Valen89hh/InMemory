"use server"

import { BiographyForView } from "@/lib/supabase/models"
import { createClient } from "@/lib/supabase/server"
import { Result } from "@/lib/utils/response"
import { revalidatePath } from "next/cache"


export const getBiographyForViewPublic = async(idBio: string): Promise<Result<BiographyForView>>=>{
    const supabase = createClient()

    const {
        data: biography,
        error: errorBiography,
    } = await supabase
        .from("biographies")
        .select("*, images_biographies(image_url), videos_biographies(video_url)")
        .eq("id", idBio)
        .eq("status", "publico")
        .maybeSingle()

    if(errorBiography) return {success: false, error: errorBiography.message}
    if(!biography) return {success: false, error: "La biografía no esta disponible"}

    const {
        data: messages,
        error: errorMessages
    } = await supabase
        .from("messages")
        .select()
        .eq("biography_id", biography.id)

    if(errorMessages) return {success: false, error: errorMessages.message}
    
    return {
        success: true,
        data: {
            ...biography,
            videos: biography.videos_biographies.map(video=>video.video_url),
            photos: biography.images_biographies.map(img=>img.image_url),
            messages: messages ?? []
        }
    }



    
}
export const getBiographyForViewPrivate = async(idBio: string): Promise<Result<BiographyForView>>=>{
    const supabase = createClient()
    const {data: {user}} = await supabase.auth.getUser()
    if(!user) return {success: false, error: "No estas autenticado"}
    
    const {
        data: biography,
        error: errorBiography,
    } = await supabase
        .from("biographies")
        .select("*, images_biographies(image_url), videos_biographies(video_url)")
        .eq("id", idBio)
        .eq("profile_id", user.id)
        .maybeSingle()

    if(errorBiography) return {success: false, error: errorBiography.message}
    if(!biography) return {success: false, error: "La biografía no te pertenece"}

    const {
        data: messages,
        error: errorMessages
    } = await supabase
        .from("messages")
        .select()
        .eq("biography_id", biography.id)

    if(errorMessages) return {success: false, error: errorMessages.message}
    
    return {
        success: true,
        data: {
            ...biography,
            videos: biography.videos_biographies.map(video=>video.video_url),
            photos: biography.images_biographies.map(img=>img.image_url),
            messages: messages ?? []
        }
    }

    
}