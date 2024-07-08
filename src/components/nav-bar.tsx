"use client"

import Logo from "@/components/logo";
import Link from "next/link";
import ButtonOutline from "./buttons/button-outline";
import ButtonPrimary from "./buttons/button-primary";
import Container from "@/components/containers/container";
import Menu from "./icons/menu";
import { useSideBarStore } from "@/lib/storage/side-bar-storage";
import { useAuthStore } from "@/lib/storage/auth-storage";
import Image from "next/image";
import AccountIcon from "./icons/account-icon";
import LogoutIcon from "./icons/logout-icon";
import { useEffect, useState } from "react";
import { resolve } from "path";

const NavBar = () => {
    const {openSideBar} = useSideBarStore(state=>state)
    const [stateCardAccount, setStateCardAccount] = useState(false)
    const {user, logOut, loading} = useAuthStore()

    const handleLogOut = ()=>{
        try{
            logOut()
        }catch(err){
            console.log(err)
        }
    }

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
                            {loading ? <div>loading...</div> : !user ? (
                                <li className="space-x-2 ml-6">
                                    <Link href={"/login"}>
                                        <ButtonOutline className="py-1" >
                                            Empezar
                                        </ButtonOutline>
                                    </Link>
                                </li>
                            ): (
                                <li className="ml-4">
                                    <Image
                                        onClick={()=>setStateCardAccount(!stateCardAccount)}
                                        src={user.photoURL!!} 
                                        alt=""
                                        width={50}
                                        height={50}
                                        className="object-cover cursor-pointer rounded-full h-[2rem] w-[2rem]"
                                    />

                                    <ul className={`${!stateCardAccount && "hidden"} absolute space-y-2 bg-background rounded-md border-2 border-solid border-gray-light p-4 top-[3.5rem] right-[2rem]`}>
                                        <li>
                                            <Link className="flex hover:underline gap-2 items-center" href={"/dashboard/biographies"}>
                                                <AccountIcon width={17} height={17} color="#1E1E1E"/>
                                                My account
                                            </Link>
                                        </li>
                                        <li>
                                            <button onClick={handleLogOut} className="flex hover:underline gap-2 items-center">
                                                <LogoutIcon width={15} height={15} color="#1E1E1E"/>
                                                Logout
                                            </button>
                                        </li>
                                    </ul>

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