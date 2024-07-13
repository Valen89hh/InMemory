import { create } from "zustand"

type BioPay = {
    name: string,
    bioId: string,
    userId: string
}

interface State{
    stateModalPayment: boolean,
    openModelPayment: ()=>void
    closeModelPayment: ()=>void,
    bioPay: BioPay | null,
    setBioPay: (value: BioPay)=>void
}

export const useMethodosPayment = create<State>((set)=>({
    stateModalPayment: false,
    bioPay: null,
    setBioPay: (value)=>set({bioPay: value}),
    openModelPayment: ()=>set({stateModalPayment: true}),
    closeModelPayment: ()=>set({stateModalPayment: false}),
}))