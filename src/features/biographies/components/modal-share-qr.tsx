"use client"

import Modal from "@/components/widgets/modal";
import { useModalShareQrStorage } from "../storage/use-modal-share-qr";
import Card from "@/components/cards/card";
import BiographyQrGenerator from "@/features/bio-qr/components/biography-qr-generator";
import { Download, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { SocialIcon } from 'react-social-icons'
import { stringToUrlSlug } from "@/lib/utils/formatter-string";
import ButtonPrimary from "@/components/buttons/button-primary";
import toast from "react-hot-toast";
import DesingBiography from "@/features/bio-qr/components/desing-biography";

const ModalShareQr = () => {
    const {biography, stateModalShareQr, closeModalShareQr} = useModalShareQrStorage()
    const qrRef = useRef<HTMLDivElement>(null);
    const [bioUrl, setBioUrl] = useState('');

    useEffect(() => {
      if (typeof window !== 'undefined' && biography) {
        setBioUrl(window.location.origin+"/biography/"+biography.id);
      }
    }, [biography]);

    const handleDownload = () => {
        if (qrRef.current && biography) {
            html2canvas(qrRef.current, {scale: 3}).then((canvas) => {
                const link = document.createElement("a");
                link.download = `QR_${stringToUrlSlug(biography.name_person)}.png`;
                link.href = canvas.toDataURL("image/png");
                link.click();
            });
        }
    };

    const handleCopy = ()=>{
        navigator.clipboard.writeText(bioUrl)
            .then(() => {
                toast.success('URL copiada al portapapeles');
            })
            .catch((err) => {
                console.error('Error al copiar la URL: ', err);
        });
    }
       

    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(bioUrl)}`;
    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(bioUrl)}`;
    
    return ( 
        <Modal isOpen={stateModalShareQr} className="flex px-2 justify-center items-center">
            {biography && (

                <Card className="w-full space-y-4 sm:w-3/4 md:w-1/2 max-w-[40rem]">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl text-primary">Compartir Qr</h2>
                        <button onClick={closeModalShareQr} className="text-primary">
                            <X/>
                        </button>
                    </div>
                    <DesingBiography
                        ref={qrRef}
                        bioUrl={bioUrl}
                        namePerson={biography.name_person}
                    />
                    <div className="flex gap-2 items-center justify-center">
                        <SocialIcon
                            network="facebook"
                            href={facebookShareUrl}
                            target="_blank" rel="noopener noreferrer"
                        />
                        <SocialIcon
                            network="whatsapp"
                            href={whatsappShareUrl}
                            target="_blank" rel="noopener noreferrer"
                        />
                        <button onClick={handleDownload} className="w-[50px] text-white bg-primary rounded-full h-[50px] inline-flex justify-center items-center">
                            <Download/>
                        </button>
                    </div>
                    <div className="flex gap-2 p-2 rounded-ms w-full border-2 border-gray-light items-center">
                        <input 
                            type="text"
                            readOnly
                            value={bioUrl}
                            className="outline-none flex-1"
                        />
                        <ButtonPrimary className="text-sm py-1 rounded-full" onClick={handleCopy}>
                            Copiar
                        </ButtonPrimary>
                    </div>
                </Card>
            )}
        </Modal>
     );
}
 
export default ModalShareQr;