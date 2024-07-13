"use client"
import { buyBiography } from "@/actions/payment";
import { useMethodosPayment } from "@/lib/storage/methodos-payment-storage";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { CircularProgress } from "@mui/material";
import { useEffect, useState, useTransition } from "react";

const ButtonPayment = () => {

    const {bioPay} = useMethodosPayment()
    const [loadingPayment, startPayment] = useTransition()
    const [preferenceId, setPreferenceId] = useState("")
    useEffect(()=>{
        startPayment(async()=>{
            if(bioPay){
                const baseUrl = `${window.location.protocol}//${window.location.host}`
                const preferenceId = await buyBiography(bioPay.name, bioPay.bioId, bioPay.userId, {
                    success: baseUrl+"/api/payment/success",
                    failure: baseUrl+"/api/payment/failure"
                })
                if(preferenceId) setPreferenceId(preferenceId)
            }
        })
    }, [bioPay])

    return ( 
       <div className="flex justify-center items-center">
            {loadingPayment ? (
                <CircularProgress/>
            ): (
                <>
                    {preferenceId ? (
                        <Wallet initialization={{preferenceId: preferenceId}}/>
                    ): (
                        <span className="text-gray-dark mb-3 text-center">No hay metodo pago habilidato</span>
                    )}
                </>
            )}
       </div> 
    );
}
 
export default ButtonPayment;