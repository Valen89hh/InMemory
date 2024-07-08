import { create } from "zustand"

interface State{
    stateModalAddress: boolean,
    openModelAddress: ()=>void
    closeModelAddress: ()=>void
}

export const useModalAddress = create<State>((set)=>({
    stateModalAddress: false,
    openModelAddress: ()=>set({stateModalAddress: true}),
    closeModelAddress: ()=>set({stateModalAddress: false})
}))