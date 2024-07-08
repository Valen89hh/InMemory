
import CardAuth from "@/components/auth/card-auth";
import Image from "next/image";
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "InMemory - Login",
    description: "Login para InMemory",
};


const LoginPage = () => {
    return ( 
        <main className="flex w-screen h-screen">
            <Image
                alt="login image"
                src={"/img/login.png"}
                width={766}
                height={902}
                className="w-[50%] h-full object-cover hidden md:block"
            />
            <CardAuth
                title="Ingresa a tu cuenta facilemente"
                msgFacebook="Login with Facebook"
                msgGoogle="Login with Google"
            />

        </main>
     );
}
 
export default LoginPage;