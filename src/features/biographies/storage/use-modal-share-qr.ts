import { Biography } from "@/lib/supabase/models";
import { create } from "zustand";

interface ModalShareQrState{
    stateModalShareQr: boolean
    biography: Biography | null
    openModalShareQr: (biography: Biography)=>void
    closeModalShareQr: ()=>void
}

export const useModalShareQrStorage = create<ModalShareQrState>(set=>({
    stateModalShareQr: false,
    biography: null,
    openModalShareQr: (bio)=>set({stateModalShareQr: true, biography: bio}),
    closeModalShareQr: ()=>set({stateModalShareQr: false, biography: null})
}))