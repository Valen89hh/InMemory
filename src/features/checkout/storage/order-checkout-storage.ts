import { create } from "zustand";

interface OrderCheckoutState{
    preferenceId: string,
    setPreferenceId: (id: string)=>void
}

export const useOrderCheckoutState = create<OrderCheckoutState>(set=>({
    preferenceId: "",
    setPreferenceId: (id)=>set({preferenceId: id})
}))