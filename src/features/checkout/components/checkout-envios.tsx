import { Biography } from "@/lib/supabase/models"
import { useCheckoutEnvios } from "../hooks/use-checkout-envios"
import { useCheckoutInformationState } from "../storage/checkout-information-storage"
import { Subtitle } from "./subtitle"
import { ChevronLeft } from "lucide-react"
import { usePriceState } from "../storage/price-storage"
import ButtonPrimary from "@/components/buttons/button-primary"

export const CheckoutEnvios = ({biography}: {biography: Biography}) => {
    const {shippingPrice} = usePriceState()
    const {information} = useCheckoutInformationState()
    const {loadingCreate, handleCreateOrder, handleNavToInformation} = useCheckoutEnvios(biography)

    return ( 
        <div className="space-y-4 py-4">
            <table className="min-w-full border-collapse text-sm">
                <tbody>
                    <tr className="border-t border-l border-r border-border">
                        <td className="px-4 py-2 text-gris font-medium bg-white">Contacto</td>
                        <td className="px-4 py-2 text-secondary-text bg-white">{information.email}</td>
                        <td className="px-4 py-2 bg-white">
                            <button onClick={handleNavToInformation} className="underline text-primary">Cambiar</button>
                        </td>
                    </tr>
                    <tr className="border-t border-l border-r border-border">
                        <td className="px-4 py-2 text-gris font-medium bg-white">Enviar a</td>
                        <td className="px-4 py-2 text-secondary-text bg-white">
                            {information.nombre}, {information.direccion}, {information.departamento}, {information.provincia}, {information.distrito}
                        </td>
                        <td className="px-4 py-2 bg-white">
                            <button onClick={handleNavToInformation} className="underline text-primary">Cambiar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <section className="space-y-2">
                <Subtitle>M&eacute;todos de env&iacute;o</Subtitle>
                <button className="text-sm border-solid text-secondary-text font-medium bg-white p-4 rounded-md border-primary border-2 text-start flex items-center justify-between">
                    <h2 className="w-3/4">Delivery InMemory Crew - Max 72h hábiles, solo {information.departamento} (Pss: ¡Si compras más de S/.200.00 el delivery es GRATIS!)</h2>
                    <span className="font-semibold">S/ {shippingPrice}</span>
                </button>
            </section>

            <div className="flex gap-4 flex-col-reverse sm:flex-row items-center justify-between mt-4">
                <button onClick={handleNavToInformation} className="flex items-center gap-1 text-primary">
                    <ChevronLeft className="text-primary" size={16}/>
                    Volver a informaci&oacute;n
                </button>

                <ButtonPrimary onClick={handleCreateOrder} disabled={loadingCreate} isLoading={loadingCreate}  className=" w-full sm:w-fit">
                    Continuar con el pago
                </ButtonPrimary>
            </div>
        </div>
     );
}