"use client"

import ButtonPrimary from "@/components/buttons/button-primary";
import { Biography } from "@/lib/supabase/models";
import { formatDataToString } from "@/utils/formater-date";
import { Eye, FilePenLine, Pencil, QrCode, ScanEye, Share2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useModalShareQrStorage } from "../storage/use-modal-share-qr";
import { useCardBiography } from "../hooks/use-card-biography";

const CardBiography = ({biography}: {biography: Biography}) => {
    const {openModalShareQr} = useModalShareQrStorage()
    const {loadingBuy, handleBuyQr} = useCardBiography(biography)

    return ( 
        <article>
            <div className="w-full relative">
                <Image
                    alt={biography.name_person}
                    src={biography.photo_person}
                    width={4000}
                    height={4000}
                    className="w-full h-[15rem] object-cover"
                />

                <div className="absolute inset-0 bg-black bg-opacity-20 p-2 transition-all duration-300">
                    <div className="flex justify-between items-center">
                        <span className={`rounded-[2px] ${biography.status == "privado" ? "text-yellow-600" : "text-green-600"} bg-white text-sm text-center px-2`}>
                            {biography.status == "privado" ? "Privado" : "Público"}
                        </span>
                        <div className="text-sm space-x-2">
                            <Link href={"/preview/"+biography.id}>
                                <button title="Previsualizar" className="text-primary p-1 hover:bg-slate-100 rounded-[2px] underline bg-white">
                                    <ScanEye size={18}/>
                                </button>
                            </Link>

                            <Link href={"/dashboard/biographies/edit/"+biography.id}>
                                <button title="Editar" className="text-primary p-1 hover:bg-slate-100 rounded-[2px] underline bg-white">
                                    <FilePenLine size={18}/>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-start mt-2 gap-4">
                <div className="flex flex-col justify-start">
                    <h3 className="text-xl text-primary uppercase">{biography.name_person}</h3>
                    <span className="text-sm text-gray-dark">{formatDataToString(new Date(biography.date_of_birth))} - {formatDataToString(new Date(biography.date_of_death))}</span>
                    {biography.status === "privado" ? (
                        <ButtonPrimary onClick={handleBuyQr} disabled={loadingBuy} isLoading={loadingBuy} className="flex mt-2 justify-center items-center gap-2 w-fit">
                            Adquirir placa QR <QrCode width={18} height={18}/>
                        </ButtonPrimary>
                    ) : (
                        <ButtonPrimary onClick={()=>openModalShareQr(biography)} className="flex mt-2 justify-center items-center gap-2 w-fit">
                            Compartir Biografía <Share2 width={18} height={18}/>
                        </ButtonPrimary>
                    )}
                </div>
            </div>
        </article>
    );
}

 


 
export default CardBiography;