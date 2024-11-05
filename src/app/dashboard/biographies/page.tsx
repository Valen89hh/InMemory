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
import { useMethodosPayment } from "@/lib/storage/methodos-payment-storage";
import ButtonPayment from "@/components/buttons/button-payment";
import Biographies from "@/features/biographies/components/biographies";


const BiographiesPage = () => {
    return ( 
        <Biographies/>
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
    const {openModelPayment, setBioPay} = useMethodosPayment()



    const handleBuy = useCallback(async()=>{
        if(completeAdress){
            setBioPay({
                name: biography.name,
                bioId: biography.id,
                userId: biography.userId
            })
            openModelPayment()
        } else {
            openModelAddress()
        }
    }, [])

    return ( 
        <article>
            <div className="w-full relative">
                <img
                    alt="imagen"
                    src={biography.photoPerson}
                    width={4000}
                    height={4000}
                    className="w-full h-[15rem] object-cover"
                />

                <div className="absolute inset-0 flex justify-center items-center gap-4 group bg-transparent transition-all duration-300 xs:hover:bg-[#00000069]">
                    <Link href={"/preview/"+biography.id}>
                        <button title="Previsualizar" className="transition-all duration-300 opacity-0 hidden xs:group-hover:opacity-100 bg-white cursor-pointer h-[4rem] w-[4rem] xs:group-hover:inline-flex justify-center items-center rounded-full">
                            <PreviewIcon color="#003F5F"/>
                        </button>
                    </Link>

                    <Link href={"/dashboard/biographies/edit/"+biography.id}>
                        <button title="Editar" className="transition-all duration-300 opacity-0 hidden xs:group-hover:opacity-100 bg-white cursor-pointer h-[4rem] w-[4rem] xs:group-hover:inline-flex justify-center items-center rounded-full">
                            <EditIcon color="#003F5F"/>
                        </button>
                    </Link>

                    {biography.statusPayment === "pagado" && (
                        <Link href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`BIOGRAFÍA - ${biography.name.toUpperCase()}`)}%20${encodeURIComponent(`${window.location.protocol}//${window.location.host}/biography/${biography.id}`)}`} target="_blank" rel="noopener noreferrer">
                            <button title="Compartir" className="transition-all duration-300 opacity-0 hidden xs:group-hover:opacity-100 bg-white cursor-pointer h-[4rem] w-[4rem] xs:group-hover:inline-flex justify-center items-center rounded-full">
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
                    {biography.statusPayment === "" ? (
                        <ButtonPrimary onClick={handleBuy} className="flex mt-2 justify-center items-center gap-2 w-fit">
                            Buy Qr <PayIcon width={18} height={18}/>
                        </ButtonPrimary>
                    ) : (
                        <span className="text-center w-fit text-primary text-sm">{biography.statusPayment}</span>
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

 

