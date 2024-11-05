import { create } from "zustand";

interface ModalState{
    stateModalExitChange: boolean,
    closeModalExitChange: ()=>void,
    openModalExitChange: ()=>void
}

export const useModalExitChangeState = create<ModalState>(set=>({
    stateModalExitChange: false,
    closeModalExitChange: ()=>set({stateModalExitChange: false}),
    openModalExitChange: ()=>set({stateModalExitChange: true}),
}))