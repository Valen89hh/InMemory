import { create } from "zustand";

interface State{
    stateSideBar: boolean
    openSideBar: ()=>void
    closeSideBar: ()=>void
}

export const useSideBarStore = create<State>((set)=>({
    stateSideBar: false,
    openSideBar: ()=>set({stateSideBar: true}),
    closeSideBar: ()=>set({stateSideBar: false})
}))