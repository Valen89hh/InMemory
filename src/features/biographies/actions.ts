"use server"

import { Biography, BiographyForEdit, Product } from "@/lib/supabase/models"
import { createClient } from "@/lib/supabase/server"
import { fileNameToUrlSlug, stringToUrlSlug } from "@/lib/utils/formatter-string"
import { generateUUID } from "@/lib/utils/generator-uuid"
import { Result } from "@/lib/utils/response"
import { MessagesState } from "./hooks/use-messages"


interface DataCreateBiography{
    namePerson: string,
    description: string,
    photoPerson: DataResultUpload
    mainMessage: string,
    dateOfBirth: Date,
    dateOfDeath: Date,
    photos: DataResultUpload[],
    videos: DataResultUpload[]
    messages: MessagesState[]
}


export const createBiography = async(data: DataCreateBiography): Promise<Result<string>>=>{
    const supabase = createClient()

    const {data: {user}} = await supabase.auth.getUser()
    if(!user) return {success: false, error: "Usuario no encontrado"}


    const {
        data: bio,
        error: errorBio
    } = await supabase
        .from("biographies")
        .insert({
            name_person: data.namePerson,
            photo_path: data.photoPerson.path,
            photo_person: data.photoPerson.url,
            descrption: data.description,
            main_message: data.mainMessage,
            date_of_birth: data.dateOfBirth.toISOString(),
            date_of_death: data.dateOfDeath.toISOString(),
            profile_id: user.id
        })
        .select("id")
        .maybeSingle()

    if(errorBio) return {success: false, error: errorBio.message}
    if(!bio) return {success: false, error: "No se pudo crear la bioagrafía"}
    
    try {
        if(data.photos.length > 0){
            Promise.all(
                data.photos.map(async(photo)=>{
                    const {
                        error: errorPhoto
                    } = await supabase
                        .from("images_biographies")
                        .insert({
                            biography_id: bio.id,
                            image_url: photo.url,
                            image_path: photo.path
                        })
                    if(errorPhoto) throw new Error(errorPhoto.message)
                })
            )
        }
        if(data.videos.length > 0){
            Promise.all(
                data.videos.map(async(video)=>{
                    const {
                        error: errorVideo
                    } = await supabase
                        .from("videos_biographies")
                        .insert({
                            biography_id: bio.id,
                            video_url: video.url,
                            video_path: video.path
                        })
                    if(errorVideo) throw new Error(errorVideo.message)
                })
            )
        }
        if(data.messages.length > 0){
            Promise.all(
                data.messages.map(async(msg)=>{
                    const {
                        error: errorMessage
                    } = await supabase
                        .from("messages")
                        .insert({
                            biography_id: bio.id,
                            message_text: msg.content,
                        })
                    if(errorMessage) throw new Error(errorMessage.message)
                })
            )
        }

        return {
            success: true,
            data: "Biografía creada correctamente"
        }
    } catch (error) {
        if(error instanceof Error){
            return {success: false, error: error.message}
        }else{
            return {success: false, error: "Ocurrio un error inesperado"}
        }
    }

    
}
export const updateBiography = async(data: DataCreateBiography, idBio: string): Promise<Result<string>>=>{
    const supabase = createClient()
    const {data: {user}} = await supabase.auth.getUser()
    if(!user) return {success: false, error: "Usuario no encontrado"}


    const {
        data: bio,
        error: errorBio
    } = await supabase
        .from("biographies")
        .update({
            name_person: data.namePerson,
            photo_path: data.photoPerson.path,
            photo_person: data.photoPerson.url,
            descrption: data.description,
            main_message: data.mainMessage,
            date_of_birth: data.dateOfBirth.toISOString(),
            date_of_death: data.dateOfDeath.toISOString(),
        })
        .eq("id", idBio)
        .eq("profile_id", user.id)
        .select("id")
        .maybeSingle()

    if(errorBio) return {success: false, error: errorBio.message}
    if(!bio) return {success: false, error: "No se pudo crear la bioagrafía"}

    const photos = data.photos.filter(img=>!img.idDb)
    const videos = data.videos.filter(video=>!video.idDb)
    const messages = data.messages.filter(msg=>msg.isNew)
    
    try {
        if(photos.length > 0){
            Promise.all(
                photos.map(async(photo)=>{
                    const {
                        error: errorPhoto
                    } = await supabase
                        .from("images_biographies")
                        .insert({
                            biography_id: bio.id,
                            image_url: photo.url,
                            image_path: photo.path
                        })
                    if(errorPhoto) throw new Error(errorPhoto.message)
                })
            )
        }
        if(videos.length > 0){
            Promise.all(
                videos.map(async(video)=>{
                    const {
                        error: errorVideo
                    } = await supabase
                        .from("videos_biographies")
                        .insert({
                            biography_id: bio.id,
                            video_url: video.url,
                            video_path: video.path
                        })
                    if(errorVideo) throw new Error(errorVideo.message)
                })
            )
        }
        if(messages.length > 0){
            Promise.all(
                messages.map(async(msg)=>{
                    const {
                        error: errorMessage
                    } = await supabase
                        .from("messages")
                        .insert({
                            biography_id: bio.id,
                            message_text: msg.content,
                        })
                    if(errorMessage) throw new Error(errorMessage.message)
                })
            )
        }

        return {
            success: true,
            data: "Biografía creada correctamente"
        }
    } catch (error) {
        if(error instanceof Error){
            return {success: false, error: error.message}
        }else{
            return {success: false, error: "Ocurrio un error inesperado"}
        }
    }

    
}


export const getBiographyForEdit = async(idBio: string): Promise<Result<BiographyForEdit>>=>{
    const supabase = createClient()
    const {data: {user}} = await supabase.auth.getUser()
    if(!user) return {success: false, error: "Usuario no encontrado"}
    
    const {
        data: biography,
        error: errorBio
    } = await supabase
        .from("biographies")
        .select()
        .eq("id", idBio)
        .eq("profile_id", user.id)
        .maybeSingle()
    
    if(errorBio) return {success: false, error: errorBio.message}
    if(!biography) return {success: false, error: "No se encontro la biografía"}

    const {
        data: images,
        error: errorImages
    } = await supabase
        .from("images_biographies")
        .select()
        .eq("biography_id", biography.id)

    if(errorImages) return {success: false, error: errorImages.message}
    if(!images) return {success: false, error: "No se econtraron las imagenes"}

    const {
        data: videos,
        error: errorVideos
    } = await supabase
        .from("videos_biographies")
        .select()
        .eq("biography_id", biography.id)

    if(errorVideos) return {success: false, error: errorVideos.message}
    if(!videos) return {success: false, error: "No se econtraron los videos"}

    const {
        data: messages,
        error: errorMessages
    } = await supabase
        .from("messages")
        .select()
        .eq("biography_id", biography.id)

    if(errorMessages) return {success: false, error: errorMessages.message}
    if(!messages) return {success: false, error: "No se econtraron los mensajes"}

    return {
        success: true,
        data: {
            ...biography,
            photos: images,
            videos: videos,
            messages: messages
        }
    }


}   

export const getBiographiesByUser = async(search: string | null): Promise<Result<Biography[]>>=>{
    const supabase = createClient()
    const {data: {user}} = await supabase.auth.getUser()
    if(!user) return {success: false, error: "Usuario no encontrado"}

    const query = supabase
        .from("biographies")
        .select()
        .eq("profile_id", user.id)

    if(search){
        query.ilike("name_person", `%${search}%`)
    }

    const {
        data: biographies,
        error: errorBiographies
    } = await query

    if(errorBiographies) return {success: false, error: errorBiographies.message}
    if(!biographies) return {success: false, error: "No se enontraron biografias"}

    return {
        success: true,
        data: biographies
    }
}

export interface DataResultUpload{
    path: string,
    url: string,
    idDb?: number
}

export const uploadImageBiography = async(data: FormData, idUser: string): Promise<Result<DataResultUpload>>=>{
    const supabase = createClient()
    const file = data.get("file") as File
    if(!file) return {success: false, error: "El file es requerido"}
     // Verificar tamaño máximo del archivo (25 MB)
    const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB en bytes
    if (file.size > MAX_FILE_SIZE) {
        return { success: false, error: "El archivo excede el tamaño máximo permitido de 25 MB" };
    }
    console.log(file.name)
    const imagePath = `${idUser}/image/${generateUUID()}-${fileNameToUrlSlug(file.name)}`;
    const {
        error: errorUpload
    } = await supabase.storage
        .from("biography")
        .upload(imagePath, file)

    if(errorUpload) return {success: false, error: errorUpload.message}

    const imageUrl = supabase.storage.from("biography").getPublicUrl(imagePath).data.publicUrl

    return {
        success: true,
        data: {
            path: imagePath,
            url: imageUrl,
        }
    }

}
export const uploadFileBiography = async(bucketName: string, data: FormData, idUser: string, type: "image" | "video"): Promise<Result<DataResultUpload>>=>{
    const supabase = createClient()
    const file = data.get("file") as File
    if(!file) return {success: false, error: "El file es requerido"}
     // Verificar tamaño máximo del archivo (25 MB)
    const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB en bytes
    if (file.size > MAX_FILE_SIZE) {
        console.log("file muy pesada")
        return { success: false, error: "El archivo excede el tamaño máximo permitido de 25 MB" };
    }

    console.log(file.name)
    const imagePath = `${idUser}/${type}/${generateUUID()}-${fileNameToUrlSlug(file.name)}`;
    const {
        error: errorUpload
    } = await supabase.storage
        .from(bucketName)
        .upload(imagePath, file)

    if(errorUpload) return {success: false, error: errorUpload.message}

    const imageUrl = supabase.storage.from(bucketName).getPublicUrl(imagePath).data.publicUrl

    return {
        success: true,
        data: {
            path: imagePath,
            url: imageUrl,
        }
    }

}

export const deleteFilesStorage = async(bucketName: string, file: DataResultUpload, typeManage: "image" | "video"): Promise<Result<string>>=>{
    const supabase = createClient()
    if(file.idDb){
        if(typeManage == "image"){
            const {
                error: errorDeleteImg
            } = await supabase
                .from("images_biographies")
                .delete()
                .eq("id", file.idDb)
            if(errorDeleteImg) return {success: false, error: errorDeleteImg.message}
        }
        else if(typeManage == "video"){
            const {
                error: errorDeleteVideo
            } = await supabase
                .from("videos_biographies")
                .delete()
                .eq("id", file.idDb)
            
            if(errorDeleteVideo) return {success: false, error: errorDeleteVideo.message}
        }
    }

    const {
        error: errorDelete
    } = await supabase.storage
        .from(bucketName)
        .remove([file.path])
    console.debug(errorDelete)
    if(errorDelete) return {success: false, error: errorDelete.message}
    console.debug("Eliminado correcatamente")
    return {
        success: true,
        data: "Archivos elimandos correctamente"
    }
}

export const deleteMessage = async(idMessage: number): Promise<Result<string>>=>{
    const supabase = createClient()
    const {
        error: errorMessage
    } = await supabase
        .from("messages")
        .delete()
        .eq("id", idMessage)

    if(errorMessage) return {success: false, error: errorMessage.message}

    return{
        success: true,
        data: "Mensaje eliminado correctamente"
    }
}

export const getProductForBuy = async(): Promise<Result<Product>>=>{
    const supabase = createClient()

    const {
        data: product,
        error: errorProduct
    } = await supabase
        .from("products")
        .select()
        .eq("id", "d40f9e93-de0e-4015-8be6-eb0b71bdddac")
        .maybeSingle()

    if(errorProduct) return {success: false, error: errorProduct.message}
    if(!product) return {success: false, error: "No hay producto qr"}

    return {
        success: true,
        data: product
    }
}   