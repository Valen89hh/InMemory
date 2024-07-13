"use client"

import { buyBiography } from "@/actions/payment";
import ButtonPrimary from "@/components/buttons/button-primary";
import Card from "@/components/cards/card";
import Close from "@/components/icons/close";
import EditIcon from "@/components/icons/edit-icon";
import PayIcon from "@/components/icons/pay-icon";
import PreviewIcon from "@/components/icons/preview-icon";
import SearchIcon from "@/components/icons/search-icon";
import ShareIcon from "@/components/icons/share-icon";
import ErrorToast from "@/components/toast/error-toast";
import { getBiographiesByName, getBiographiesByUser } from "@/lib/firebase";
import { Biography } from "@/lib/models/biography-model";
import { useAuthStore } from "@/lib/storage/auth-storage";
import { useModalAddress } from "@/lib/storage/modal-address-storage";
import { formatDataToString } from "@/utils/formater-date";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";


const BiographiesPage = () => {
    const {user, completeAdress} = useAuthStore()
    const {closeModelAddress, stateModalAddress} = useModalAddress()
    const [loading, startLoading] = useTransition()
    const [biographies, setBiographies] = useState<Biography[]>([])
    const [stateSearch, setStateSearch] = useState(false)
    const [stateInitLoad, setStateInitLoad] = useState(false)
    useEffect(()=>{
        if(user){
            getBiographies()
            initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!)

        }
    }, [])

  

    const searchBiographies = useCallback((search: string)=>{
        if(user){
            setStateInitLoad(false)
            startLoading(async()=>{
                const res = await getBiographiesByName(user.uid, search)
                if(res.biographies){
                    setStateSearch(res.biographies.length === 0)
                    setBiographies(res.biographies)
                }else if(res.error){
                    toast.custom((t)=><ErrorToast t={t} msg={res.error}/>)
                }
            })
        }
    }, [])

    const getBiographies = useCallback(()=>{
        if(user){
            setStateSearch(false)
            startLoading(async()=>{
                const res = await getBiographiesByUser(user.uid)
                console.log(res)
                if(res.biographies){
                    setBiographies(res.biographies)
                    setStateInitLoad(res.biographies.length === 0)
                }else if(res.error){
                    toast.custom((t)=><ErrorToast t={t} msg={res.error}/>)
                }
            })
        }
    }, [])

    return ( 
        <Card>
            <h3 className="text-primary text-3xl mb-[2rem] text-center">Mis Biografias</h3>
            <Search onSearch={searchBiographies}/>
            {loading ? (
                <div className="h-[20rem] w-full flex justify-center items-center">
                    <CircularProgress color="primary"/>
                </div>
            ): (
                <section className="grid gap-6 py-4 border-solid border-t-2 mt-6 border-gray-dark grid-cols-1 lg:grid-cols-2">
                    {biographies.map(bio=>(
                        <CardBiografia
                            key={bio.id}
                            biography={bio}
                            completeAdress={completeAdress}
                            userId={user?.uid!}
                        />
                    ))}

                    
                </section>
            )}

            {stateSearch && (
                <div className="h-[20rem] gap-2 flex-col w-full flex justify-center items-center">
                    <span>Sin resultados</span>
                    <ButtonPrimary onClick={getBiographies}>
                        Obtener todos
                    </ButtonPrimary>
                </div>
            )}

            {stateInitLoad && (
                <div className="h-[20rem] gap-2 flex-col w-full flex justify-center items-center">
                    <span>Sin Biograf&iacute;as</span>
                    <Link href={"/dashboard/biographies/create"}>
                        <ButtonPrimary>
                            Crear Biograf&iacute;a
                        </ButtonPrimary>
                    </Link>
                </div>
            )}

            <div className={`${!stateModalAddress && "hidden"} bg-[#00000060] flex justify-center items-center fixed inset-0 z-[20] h-screen w-screen`}>
                <Card className="w-1/2 relative">
                    <h3 className="text-primary text-xl">Datos Personales y Ubicaci&oacute;n</h3>
                    <p className="text-gray-dark mb-3">Es necesario que completes todos tus datos personales y de ubicaci&oacute;n para poder enviarte tu placa QR</p>
                    <Link onClick={closeModelAddress} href={"/dashboard/settings"}>
                        <ButtonPrimary>
                            Completar
                        </ButtonPrimary>
                    </Link>
                    <Close onClick={closeModelAddress} color="#003F5F" width={18} height={18} className="absolute cursor-pointer top-3 right-4"/>
                </Card>
            </div>
        </Card>
    );
}
 
export default BiographiesPage;


const Search = ({onSearch}: {onSearch: (search: string)=>void}) => {
    const [search, setSearch] = useState("")
    const handleSearch = ()=>{
        if(search){
            onSearch(search)
            setSearch("")
        }
    }
    
    return ( 
        <div className="w-full lg:w-1/2 bg-background rounded-md p-3 flex justify-between items-center gap-2">
            <input value={search} onChange={(e)=>setSearch(e.target.value)} className="outline-none w-full bg-transparent text-gray-dark placeholder:text-gray-dark" placeholder="Buscar bigrofia" type="text" />
            <SearchIcon className="cursor-pointer hover:shadow-md" onClick={handleSearch} width={18} height={18} color="#757575"/>
        </div>
     );
}

const CardBiografia = ({
    biography,
    completeAdress,
    userId
}: {
    biography: Biography,
    completeAdress: boolean,
    userId: string
}) => {
    const {openModelAddress} = useModalAddress()
    const [preferenceId, setPreferenceId] = useState("")
    const [loadingIdPreference, startIdPreference] = useTransition()

    useEffect(()=>{
        startIdPreference(async()=>{
            const baseUrl = `${window.location.protocol}//${window.location.host}`
            const preferenceId = await buyBiography(biography.name, biography.id, userId,{
                success: baseUrl+"/api/payment/success",
                failure: baseUrl+"/api/payment/failure"
            })
            if(preferenceId) setPreferenceId(preferenceId)
        })
    }, [])

    const handleBuy = useCallback(async()=>{
        if(completeAdress && preferenceId){
            
        }else{
            openModelAddress()
        }
    }, [])

    return ( 
        <article>
            <div className="w-full relative">
                <img
                    alt="imgane"
                    src={biography.photoPerson}
                    width={4000}
                    height={4000}
                    className="w-full h-[15rem] object-cover"
                />

                <div className="absolute inset-0 flex justify-center items-center gap-4 group bg-transparent transition-all duration-300  xs:hover:bg-[#00000069]">
                    <Link href={"/preview/"+biography.id}>
                        <button title="Previsualizar" className=" transition-all duration-300 opacity-0 hidden xs:group-hover:opacity-100 bg-white cursor-pointer h-[4rem] w-[4rem] xs:group-hover:inline-flex justify-center items-center rounded-full">
                            <PreviewIcon color="#003F5F"/>
                        </button>
                    </Link>

                    <Link href={"/dashboard/biographies/edit/"+biography.id}>
                        <button title="Editar" className=" transition-all duration-300 opacity-0 hidden xs:group-hover:opacity-100 bg-white cursor-pointer h-[4rem] w-[4rem] xs:group-hover:inline-flex justify-center items-center rounded-full">
                            <EditIcon color="#003F5F"/>
                        </button>
                    </Link>

                    {biography.statusPayment === "pagado" && (

                        <Link href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`BIOGRAFÍA - ${biography.name.toUpperCase()}`)}%20${encodeURIComponent(`${window.location.protocol}//${window.location.host}/biography/${biography.id}`)}`} target="_blank" rel="noopener noreferrer">
                            <button title="Compartir" className=" transition-all duration-300 opacity-0 hidden xs:group-hover:opacity-100 bg-white cursor-pointer h-[4rem] w-[4rem] xs:group-hover:inline-flex justify-center items-center rounded-full">
                                <ShareIcon color="#003F5F"/>
                            </button>
                        </Link>
                    )}

                </div>
            </div>
            <div className="flex justify-between items-start mt-2 gap-4">
                <div className="flex flex-col justify-start">
                    <h3 className="text-xl text-primary uppercase">{biography.name}</h3>
                    <span className="text-sm text-gray-dark">{formatDataToString(biography.dateOfBirth)} - {formatDataToString(biography.dateOfDeath)}</span>
                    
                    {loadingIdPreference ? (
                        <CircularProgress color="primary"/>
                    ): (
                        <>
                            {biography.statusPayment === "" ? (
                                <div>
                                    {preferenceId ? (
                                        <Wallet initialization={{ preferenceId: preferenceId }}/>
                                    ): (
                                        <span>Vuelve a intentar el pago</span>
                                    )}
                                </div>
                            
                            ): (
                                <span  className="text-center w-fit text-primary text-sm">{biography.statusPayment}</span>
                            )}
                        </>
                    )}
                </div>
                <div className="flex gap-2 items-center py-1 xs:hidden">
                    <Link href={"/preview/"+biography.id}>
                        <PreviewIcon width={18} height={18} color="#003F5F"/>
                    </Link>

                    <Link href={"/dashboard/biographies/edit/"+biography.id}>
                        <EditIcon width={18} height={18} color="#003F5F"/>
                    </Link>
                    {biography.statusPayment === "pagado" && (

                        <Link href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`BIOGRAFÍA - ${biography.name.toUpperCase()}`)}%20${encodeURIComponent(`${window.location.protocol}//${window.location.host}/biography/${biography.id}`)}`} target="_blank" rel="noopener noreferrer">
                            <ShareIcon width={18} height={18} color="#003F5F"/>
                        </Link>
                    )}
                </div>
            </div>
        </article>
     );
}
 

