"use client"

import ButtonPrimary from "@/components/buttons/button-primary";
import Card from "@/components/cards/card";
import { Biography } from "@/lib/supabase/models";
import { CircularProgress } from "@mui/material";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { getBiographiesByUser } from "../actions";
import { useProfileState } from "@/lib/storage/auth-storage";
import CardBiography from "./card-biography";
import Search from "@/components/widgets/search";
import { useSearchParams } from "next/navigation";
import useQuery from "@/hooks/use-query";

const Biographies = () => {
    const {profile} = useProfileState()
    const searchParams = useSearchParams()
    const [biographies, setBiographies] = useState<Biography[]>([])
    const [loadingBiographies, startLoadingBiographies] = useTransition()
    const {setQuery, getQuery} = useQuery()
    
    useEffect(()=>{
        if(profile){
            startLoadingBiographies(async()=>{
                const result = await getBiographiesByUser(null)
                if(result.success) setBiographies(result.data)
            })
        }
    }, [profile])

    const handleSearch = (search: string | null)=>{
        if(profile){
            startLoadingBiographies(async()=>{
                const result = await getBiographiesByUser(search)
                if(result.success) setBiographies(result.data)
            })
        }
    }

    return ( 
        <Card>
            <h3 className="text-primary text-3xl mb-[2rem] text-center">Mis Biografías</h3>
            <Search onSearch={()=>{
                const searchParam = getQuery("search")
                handleSearch(searchParam)
            }}/>
            {loadingBiographies ? (
                <div className="flex justify-center items-center h-[20rem] flex-col gap-2 text-primary">
                    <CircularProgress color="inherit"/>
                    <p className="text-slate-black">Buscando...</p>
                </div>
            ): biographies.length > 0 ? (
                <section className="grid gap-6 py-4 border-solid border-t-2 mt-6 border-gray-dark grid-cols-1 lg:grid-cols-2">
                    {biographies.map(bio=>(
                        <CardBiography
                            key={bio.id}
                            biography={bio}
                        />
                    ))}
                </section>
            ): searchParams.get("search") ? (
                <div className="h-[20rem] gap-2 flex-col w-full flex justify-center items-center">
                    <span>No hay biografías encontradas</span>
                    <ButtonPrimary onClick={()=>{
                        handleSearch(null)
                        setQuery("search", "")
                    }}>
                        Obtener todos
                    </ButtonPrimary>
                </div>
            ): (
                <div className="h-[20rem] gap-2 flex-col w-full flex justify-center items-center">
                    <span>Sin Biograf&iacute;as</span>
                    <Link href={"/dashboard/biographies/create"}>
                        <ButtonPrimary>
                            Crear Biograf&iacute;a
                        </ButtonPrimary>
                    </Link>
                </div>
            )}

        </Card>
     );
}
 
export default Biographies;