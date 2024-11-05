import { create } from "zustand"
import { CheckoutInformationSchema } from "../hooks/use-checkout-information-form"

interface CheckoutInformationState{
    information: CheckoutInformationSchema,
    setInformation: (data: CheckoutInformationSchema)=>void
  }
  
export const useCheckoutInformationState = create<CheckoutInformationState>(set=>({
    information: {
        email: "",
        empresa: "",
        pais: "",
        nombre: "",
        apellidos: "",
        direccion: "",
        departamento: "",
        provincia: "",
        distrito: "",
        telefono: ""
    },
    setInformation: (data)=>set({information: data})
}))
  