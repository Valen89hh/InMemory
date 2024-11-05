import { BiographyForView } from "@/lib/supabase/models";
import { useEffect, useState, useTransition } from "react";
import { getBiographyForViewPublic } from "../actions";

export function useViewBiography(idBio: string){
    const [biography, setBiography] = useState<BiographyForView>()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [loadingBio, startLoadingBio] = useTransition()

    useEffect(()=>{
        startLoadingBio(async()=>{
            const result = await getBiographyForViewPublic(idBio)
            if(result.success) setBiography(result.data)
            else setErrorMessage(result.error)
        })
    }, [])

    return {
        biography,
        errorMessage,
        loadingBio
    }
}