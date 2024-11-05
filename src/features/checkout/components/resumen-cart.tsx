import { FormEvent, useState } from "react"
import { useResumenCheckout } from "../hooks/use-resume-checkout"
import Logo from "@/components/logo"
import Field from "@/components/form/field"
import { useCartState } from "../storage/cart-storage"
import DesingBiography from "@/features/bio-qr/components/desing-biography"
import CardAnimation from "@/components/animations/card-animation"

export const ResumenCheckout = ({isSmall = false}: {isSmall?: boolean}) => {
    
    const {shippingPrice, subtotalPrice, totalPrice, productBiography} = useResumenCheckout()
    const [code, setCode] = useState("")

    const onSubmit =  (e: FormEvent)=>{
        e.preventDefault()
    }

    return ( 
        <div className={`${isSmall ? "py-3" : "p-6"} sticky top-2 w-full xl:w-[80%] space-y-4`}>
            {!isSmall && (
                <Logo/>
            )}
            <div className="space-y-4">
                {productBiography ? (
                    <DesingBiography 
                        bioUrl={window.location.origin+"/biography/"+productBiography.biography.id}
                        namePerson={productBiography.biography.name_person}
                    />
                ): (
                    <CardAnimation className="h-[20rem] w-[20rem] rounded-ms"/>
                )}
            </div>
            <form onSubmit={onSubmit} className="flex gap-2">
                <Field onChange={(e)=>setCode(e.target.value)} placeholder="Código de descuento"/>
                <button disabled={code.length === 0} className={`${code.length > 0 ? "bg-black text-white cursor-pointer" : "bg-background-1 text-gris cursor-default"} transition-all duration-300  w-[30%]  rounded-md border-solid border-2 border-border`}>
                    Aplicar
                </button>
            </form>
            <div className="flex justify-between items-center">
                <h3 className="text-sm text-secondary-text font-medium">Subtotal</h3>
                <h3 className="text-sm text-gris">S/ {subtotalPrice}</h3>
            </div>
            <div className="flex justify-between items-center">
                <h3 className="text-sm text-secondary-text font-medium">M&eacute;todos de envi&oacute;</h3>
                <h3 className="text-sm text-gris">S/ {shippingPrice}</h3>
            </div>
            <div className="flex justify-between items-center">
                <h2 className="text-2xl text-secondary-text font-bold">Total</h2>
                <h2 className="text-xl text-secondary-text font-bold"> <span className="text-sm font-normal text-gris mr-2">PEN</span> S/ {totalPrice}</h2>
            </div>
        </div>
     );
}
