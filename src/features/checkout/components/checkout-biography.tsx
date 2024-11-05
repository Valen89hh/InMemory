"use client"

import { useProfileState } from "@/lib/storage/auth-storage";
import { CheckoutInformation } from "./checkout-information";
import { TabSliderCheckout } from "./tab-slider-checkout";
import { CircularProgress } from "@mui/material";
import { CheckoutEnvios } from "./checkout-envios";
import { useCartState } from "../storage/cart-storage";
import { useEffect } from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { CheckoutPago } from "./checkout-pago";
import { ResumenCheckout } from "./resumen-cart";
import { ShowReumenCheckout } from "./show-resumen-checkout";

const CheckoutBiography = () => {
    const {loadingProfile, profile} = useProfileState()
    const {productBiography} = useCartState()

    useEffect(()=>{
        if(productBiography){
            initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!)
        }
    }, [productBiography])

    if(loadingProfile) return <div className="w-full flex justify-center items-center flex-col gap-2 text-primary h-screen">
        <CircularProgress color="inherit"/>
        <h2>Cargando Pasarela de Pago</h2>
    </div>

    if(!profile) return <div className="w-full flex justify-center items-center flex-col gap-2 text-primary h-screen">
        <h2 className="text-red-500">No existe el perfil de usuario, intentalo más tarde</h2>
    </div>

    if(!productBiography) return <div className="w-full flex justify-center items-center flex-col gap-2 text-primary h-screen">
        <h2 className="text-red-500">No existe una biografía para comprar</h2>
    </div>

    return ( 
        <div className="flex min-h-screen"> {/* Usar min-h-screen para que el contenedor crezca más allá del alto de la pantalla si es necesario */}
            <main className="w-full flex-col  lg:w-[60%] flex justify-end bg-background-1">
                <ShowReumenCheckout/>
                <TabSliderCheckout>
                    <CheckoutInformation profile={profile}/>
                    <CheckoutEnvios biography={productBiography.biography}/>
                    <CheckoutPago/>
                </TabSliderCheckout>
            </main>
            <section className="w-[40%] bg-white relative hidden lg:block">
                <ResumenCheckout />
            </section>
        </div>
     );
}
 
export default CheckoutBiography;