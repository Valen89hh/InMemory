import { create } from "zustand";

interface PriceState {
    totalPrice: number,
    subtotalPrice: number,
    shippingPrice: number
    setTotalPrice: (price: number)=>void,
    setSubTotalPrice: (price: number)=>void,
    setShippingPrice: (price: number)=>void,
}

export const usePriceState = create<PriceState>(set=>({
    totalPrice: 0,
    subtotalPrice: 0,
    shippingPrice: 10,
    setTotalPrice: (price)=>set({totalPrice: price}),
    setSubTotalPrice: (price)=>set({subtotalPrice: price}),
    setShippingPrice: (price)=>set({shippingPrice: price}),
}))