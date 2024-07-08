"use client"

import ButtonFacebook from "@/components/buttons/button-facebook";
import ButtonGoogle from "@/components/buttons/button-google";
import Logo from "@/components/logo";
import { useAuthStore } from "@/lib/storage/auth-storage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


interface CardAuthProps{
    title: string,
    msgGoogle: string,
    msgFacebook: string
}

const CardAuth: React.FC<CardAuthProps> = ({
    title,
    msgGoogle,
    msgFacebook
}) => {

    const {user, googleSignIn} = useAuthStore()
    const router = useRouter()

    useEffect(()=>{
        console.log(user, !user)
        if(user){
            router.push("/dashboard/biographies")
        }
    }, [user])

    const handleGoogleSignIn = ()=>{
        try{
             googleSignIn()
        }catch(err){
            console.log(err)
        }
    }

    return ( 
        <div className="w-full md:w-[50%] flex justify-center items-center flex-col">
                <Logo/>
                <h2 className="text-black text-[1.3rem] text-center">{title}</h2>
                <ButtonGoogle onClick={handleGoogleSignIn} className="w-3/4 max-w-[25rem] min-w-[15rem] mt-2 mb-4">
                    {msgGoogle}
                </ButtonGoogle>
            </div>
     );
}
 
export default CardAuth;