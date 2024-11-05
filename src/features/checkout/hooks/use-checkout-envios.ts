import { useTransition } from "react";
import { usePriceState } from "../storage/price-storage";
import { createOrder } from "../actions";
import { useStateTabCheckout } from "../storage/tab-checkout-storage";
import { Biography } from "@/lib/supabase/models";
import { useOrderCheckoutState } from "../storage/order-checkout-storage";
import toast from "react-hot-toast";

export function useCheckoutEnvios(biography: Biography){
    const {setActiveTab} = useStateTabCheckout()
    const [loadingCreate, startLoadingCreate] = useTransition()
    const {setPreferenceId, preferenceId} = useOrderCheckoutState()

    const handleCreateOrder = ()=>{
        if(!preferenceId){
            startLoadingCreate(async()=>{
                const baseUrl = `${window.location.protocol}//${window.location.host}`
                const result = await createOrder(biography, 1,{
                    success: baseUrl+"/api/payment/success",
                        failure: baseUrl+"/api/payment/failure"
                })
                if(result.success){
                    setPreferenceId(result.data)
                    setActiveTab(2)
                }else toast.error(result.error)
            })
        }else{
            setActiveTab(2)
        }
    }

    const handleNavToInformation = ()=>{
        setActiveTab(0)
    }

    return {
        handleCreateOrder,
        loadingCreate,
        handleNavToInformation
    }
}