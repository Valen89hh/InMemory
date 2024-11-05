import { create } from "zustand";

interface StateTabCheckout{
    activeTab: number
    setActiveTab: (value: number)=>void
}

export const useStateTabCheckout = create<StateTabCheckout>(set=>({
    activeTab: 0,
    setActiveTab: (value)=>set({activeTab: value})
}))

interface StateOrder{
    idOrder: number | null,
    setOrder: (value: number)=>void
}

export const useStateOrderId = create<StateOrder>(set=>({
    idOrder: null,
    setOrder: (value)=>set({idOrder: value})
}))



