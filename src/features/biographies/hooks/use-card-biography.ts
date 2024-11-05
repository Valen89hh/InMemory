import { Biography } from "@/lib/supabase/models";
import { useTransition } from "react";
import { getProductForBuy } from "../actions";
import { useCartState } from "@/features/checkout/storage/cart-storage";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function useCardBiography(biography: Biography){
    const router = useRouter()
    const [loadingBuy, startLoadingBuy] = useTransition()
    const {setProductBiography} = useCartState()

    const handleBuyQr = ()=>{
        startLoadingBuy(async()=>{
            const result = await getProductForBuy()
            if(result.success){
                setProductBiography({
                    biography,
                    product: result.data
                })
                router.push("/checkout")
            }else{
                toast.error(result.error)
            }
        })
    }

    return {
        loadingBuy,
        handleBuyQr
    }
}