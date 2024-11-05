import { ChevronLeft } from "lucide-react";
import { useCheckoutInformationState } from "../storage/checkout-information-storage";
import { usePriceState } from "../storage/price-storage";
import { useStateTabCheckout } from "../storage/tab-checkout-storage";
import { useOrderCheckoutState } from "../storage/order-checkout-storage";
import { Wallet } from "@mercadopago/sdk-react";

export const CheckoutPago = () => {
    const { setActiveTab } = useStateTabCheckout();
    const { information } = useCheckoutInformationState();
    const { shippingPrice } = usePriceState();
    const {preferenceId} = useOrderCheckoutState()

    return (
        <div className="space-y-4 py-4">
            <table className="min-w-full border-collapse text-sm">
                <tbody>
                    <tr className="border-t border-l border-r border-border">
                        <td className="px-4 py-2 text-gris font-medium bg-white">Contacto</td>
                        <td className="px-4 py-2 text-secondary-text bg-white">{information.email}</td>
                        <td className="px-4 py-2 bg-white">
                            <button onClick={() => setActiveTab(0)} className="underline text-primary">Cambiar</button>
                        </td>
                    </tr>
                    <tr className="border-t border-l border-r border-border">
                        <td className="px-4 py-2 text-gris font-medium bg-white">Enviar a</td>
                        <td className="px-4 py-2 text-secondary-text bg-white">
                            {information.nombre}, {information.direccion}, {information.departamento}, {information.provincia}, {information.distrito}
                        </td>
                        <td className="px-4 py-2 bg-white">
                            <button onClick={() => setActiveTab(0)} className="underline text-primary">Cambiar</button>
                        </td>
                    </tr>
                    <tr className="border-t border-l border-r border-b border-border">
                        <td className="px-4 py-2 text-gris font-medium bg-white">Método de envío</td>
                        <td className="px-4 py-2 text-secondary-text bg-white">
                            Delivery Coco Crew - Max 72h hábiles, solo {information.departamento} (Pss: ¡Si compras más de S/.200.00 el delivery es GRATIS!) <span className="font-bold"> - S/ {shippingPrice}</span>
                        </td>
                        <td className="px-4 py-2 bg-white"></td>
                    </tr>
                </tbody>
            </table>
            <div className="flex gap-4 flex-col-reverse sm:flex-row items-center justify-between mt-4">
                <button onClick={()=>setActiveTab(1)} className="flex  items-center gap-1 text-primary">
                    <ChevronLeft className="text-primary" size={16}/>
                    Volver a env&iacute;os
                </button>

                {preferenceId ? (
                    <Wallet initialization={{preferenceId: preferenceId}}/>
                ): (
                    <span className="text-gray-dark mb-3 text-center">No hay metodo pago habilidato</span>
                )}
            </div>
        </div>
    );
};