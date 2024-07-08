"use client"

import Card from "@/components/cards/card";
import ErrorToast from "@/components/toast/error-toast";
import { getBiographyById } from "@/lib/firebase";
import { Biography } from "@/lib/models/biography-model";
import { CircularProgress } from "@mui/material";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import CreateBiographyPage from "../../create/page";

const EditBiographyPage = ({params}: {params: {bioId: string}}) => {
    const [loading, startLoading] = useTransition()
    const [biography, setBiography] = useState<Biography>()


    useEffect(()=>{
        startLoading(async()=>{
            const res = await getBiographyById(params.bioId)
            if(res.biography){
                setBiography(res.biography)
            }
            else if(res.error){
                toast.custom((t)=> <ErrorToast t={t} msg={res.error}/> )
            }
        })
    }, [params.bioId])

    return (
        <div>
            {loading ? (
                <div>
                    <CircularProgress color="primary"/>
                </div>
            ): (
                <>
                    {biography ? (
                        <CreateBiographyPage editMode bio={biography}/>
                    ): (
                        <div>No existe biografia</div>
                    )}
                </>
            )}
        </div>
     );
}
 
export default EditBiographyPage;