import type { Metadata } from "next";
import LoginForm from "@/features/auth/components/login-form";
import SideImageAuth from "@/features/auth/components/side-image-auth";


export const metadata: Metadata = {
    title: "InMemory | Login",
    description: "Iniciar en InMemory y crear una cuenta",
};

const LoginPage = () => {
    return ( 
        <main className="flex w-screen h-screen bg-white">
            <SideImageAuth image="/img/login.png" alt="login image"/>
            <LoginForm/>
        </main>
     );
}
 
export default LoginPage;