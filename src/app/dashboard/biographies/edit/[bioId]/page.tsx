"use client"

import { CircularProgress } from "@mui/material";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { BiographyForEdit } from "@/lib/supabase/models";
import { getBiographyForEdit } from "@/features/biographies/actions";
import EditBiography from "@/features/biographies/components/edit-biography";

const EditBiographyPage = ({params}: {params: {bioId: string}}) => {
    const [loading, startLoading] = useTransition()
    const [biography, setBiography] = useState<BiographyForEdit>()


    useEffect(()=>{
        startLoading(async()=>{
            const res = await getBiographyForEdit(params.bioId)
            if(res.success){
                setBiography(res.data)
            }
            else{
                toast.error(res.error)
            }
        })
    }, [params.bioId])

    return (
        <div>
            {loading ? (
                <div>
                    <CircularProgress color="inherit" className="text-primary"/>
                    <h3>Cargando Biography</h3>
                </div>
            ): (
                <>
                    {biography ? (
                        <EditBiography biography={biography}/>
                    ): (
                        <div>No existe biografia</div>
                    )}
                </>
            )}
        </div>
     );
}
 
export default EditBiographyPage;