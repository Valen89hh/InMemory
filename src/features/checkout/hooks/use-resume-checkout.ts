import { useEffect } from "react"
import { usePriceState } from "../storage/price-storage"
import { useCartState } from "../storage/cart-storage"

export function useResumenCheckout(){
    const {productBiography} = useCartState()
    const {
        setTotalPrice, 
        setSubTotalPrice, 
        setShippingPrice,
        totalPrice, 
        subtotalPrice,
        shippingPrice
    } = usePriceState()

    useEffect(()=>{
        if(productBiography){
            const subtotal = productBiography.product.price
            const shippingCost = subtotal < 200 ? 10 : 0
            const total = parseFloat((subtotal + shippingCost).toFixed(2))
            setTotalPrice(total)
            setSubTotalPrice(subtotal)
            setShippingPrice(shippingCost)
        }
    }, [productBiography])


    return {
        subtotalPrice,
        totalPrice,
        shippingPrice,
        productBiography
    }
}