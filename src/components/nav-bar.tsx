"use client"

import Logo from "@/components/logo";
import Link from "next/link";
import ButtonOutline from "./buttons/button-outline";
import ButtonPrimary from "./buttons/button-primary";
import Container from "@/components/containers/container";
import Menu from "./icons/menu";
import { useSideBarStore } from "@/lib/storage/side-bar-storage";
import { useProfileState } from "@/lib/storage/auth-storage";
import Image from "next/image";
import AccountIcon from "./icons/account-icon";
import LogoutIcon from "./icons/logout-icon";
import { useEffect, useState } from "react";
import { resolve } from "path";
import { ROUTES_NOT_LAYOUT } from "@/lib/routes/layout";
import { usePathname } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { AnimatePresence, motion } from "framer-motion";
import { getProfileAuthenticated, signOut } from "@/features/auth/actions";
import { Heart, LogOut, Newspaper, NotebookText, Settings, ShoppingBasket } from "lucide-react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import useRealTimeOrders from "@/features/badge-alert/hooks/use-real-time-news-orders";
import BadgeAlertOrders from "@/features/badge-alert/components/badge-alert-orders";

const NavBar = ({user}: {user: User | null}) => {
    const {openSideBar} = useSideBarStore(state=>state)
    const {setLoadingProfile, loadingProfile, profile, setProfile} = useProfileState()
    const [stateCardAccount, setStateCardAccount] = useState(false)
    const refDash = useOutsideClick<HTMLLIElement>(()=>setStateCardAccount(false))
    useRealTimeOrders()
    const pathName = usePathname()

    useEffect(()=>{
        async function getProfileByUser(userId: string) {
            setLoadingProfile(true)
            const result = await getProfileAuthenticated(userId)
            if(result.success) setProfile(result.data)
            else setProfile(null)
            setLoadingProfile(false)
        }

        if(user){
            getProfileByUser(user.id)
        }
    }, [user])

    if(ROUTES_NOT_LAYOUT.some(route=>pathName.startsWith(route))) return null

    return ( 
            <header className="shadow-lg bg-white fixed top-0 left-0 right-0 z-10">
                <Container className="flex  justify-between items-center py-2">
                    <Logo/>

                    <nav>
                        <ul className="items-center gap-2 text-black hidden md:flex">
                            <li>
                                <Link className="hover:underline" href={"/"}>Home</Link>
                            </li>
                            <li>
                                <Link className="hover:underline" href={"/about"}>About</Link>
                            </li>
                            <li>
                                <Link className="hover:underline" href={"/contact"}>Contact</Link>
                            </li>
                            {loadingProfile ? (
                                <motion.div
                                    className="animate-pulse bg-gray-100 rounded-full h-8 w-8"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    >
                                </motion.div>
                            ) : profile ? (
                                
                                <li className="ml-4 relative" ref={refDash}>
                                    <Image
                                        onClick={()=>setStateCardAccount(!stateCardAccount)}
                                        src={profile.avatar_url ?? "/icons/user-none.svg"} 
                                        alt={profile.first_name}
                                        width={50}
                                        height={50}
                                        className="object-cover cursor-pointer rounded-full h-[2rem] w-[2rem]"
                                    />

                                    <AnimatePresence>
                                        {stateCardAccount && (
                                            <motion.div 
                                                initial={{opacity: 0}}
                                                animate={{opacity: 1}}
                                                exit={{opacity: 0}}
                                                className="absolute px-4 shadow-sm  mt-1 rounded-sm border-solid border-2 border-slate-c left-full -translate-x-full bg-white z-20">
                                                <ul >
                                                    <li className="py-4 px-1 border-solid border-b-2 border-slate-c">
                                                        <h4 className="font-medium leading-4">{profile.first_name + " " + (profile.last_name ?? "")}</h4>
                                                        <span className="text-sm">{profile.email}</span>
                                                    </li> 
                                                    <li onClick={()=>setStateCardAccount(false)} >
                                                        <Link href={"/dashboard/biographies"} className="hover:underline py-2 mt-4 px-1 flex items-center gap-1">
                                                            <Newspaper className="text-ash-gray" size={20}/>
                                                            Mis Biografías
                                                        </Link>
                                                    </li>
                                                    <li onClick={()=>setStateCardAccount(false)} >
                                                        <Link href={"/dashboard/orders"} className="hover:underline py-2 px-1 flex items-center justify-between">
                                                            <div className="flex items-center gap-1">
                                                                <ShoppingBasket className="text-ash-gray" size={20}/>
                                                                Órdenes
                                                            </div>
                                                            <BadgeAlertOrders/>
                                                        </Link>
                                                    </li>
                                                    <li onClick={()=>setStateCardAccount(false)} >
                                                        <Link href={"/dashboard/biographies/create"} className="hover:underline py-2 px-1 flex items-center gap-1">
                                                            <NotebookText className="text-ash-gray" size={20}/>
                                                            Crear Biografía
                                                        </Link>
                                                    </li>
                                                    <li onClick={()=>setStateCardAccount(false)} >
                                                        <Link href={"/dashboard/settings"} className="hover:underline mb-4 py-2 px-1 flex items-center gap-1">
                                                            <Settings className="text-ash-gray" size={20}/>
                                                            Configuraci&oacute;n
                                                        </Link>
                                                    </li>
                                                    <li onClick={async()=>{
                                                        await signOut()
                                                        setStateCardAccount(false)
                                                    }}
                                                    >
                                                        <button className="hover:underline w-full py-4 border-solid border-t-2 border-slate-c px-1 flex items-center gap-1">
                                                            <LogOut className="text-ash-gray" size={20}/>
                                                            Logout
                                                        </button>
                                                    </li>
                                                </ul>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </li>
                            ): (
                                <li className="space-x-2 ml-6">
                                    <Link href={"/login"}>
                                        <ButtonOutline className="py-1" >
                                            Iniciar Sesión
                                        </ButtonOutline>
                                    </Link>
                                    <Link href={"/register"}>
                                        <ButtonOutline className="py-1" >
                                            Registrarse
                                        </ButtonOutline>
                                    </Link>
                                </li>
                            )}
                        </ul>

                        <Menu width={20} height={20} color="#003F5F" className="block cursor-pointer md:hidden" onClick={openSideBar}/>
                    </nav>
                </Container>
            </header>
            
     );
}
 
export default NavBar;