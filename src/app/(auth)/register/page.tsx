import type { Metadata } from "next";
import LoginForm from "@/features/auth/components/login-form";
import SideImageAuth from "@/features/auth/components/side-image-auth";
import RegisterForm from "@/features/auth/components/register-form";


export const metadata: Metadata = {
    title: "InMemory | Register",
    description: "Registrarse en InMemory y crear una biografía",
};

const RegisterPage = () => {
    return ( 
        <main className="flex w-screen min-h-screen bg-white">
            <SideImageAuth image="/img/register.png" alt="register image"/>
            <RegisterForm/>
        </main>
     );
}
 
export default RegisterPage;