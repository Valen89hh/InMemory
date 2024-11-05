"use client"

import ButtonGoogle from "@/components/buttons/button-google";
import Logo from "@/components/logo";
import { loginWithCredentials, signInWithGoogle } from "../actions";
import Field from "@/components/form/field";
import FieldPassword from "@/components/form/field-password";
import ButtonPrimary from "@/components/buttons/button-primary";
import Link from "next/link";
import { motion } from "framer-motion";
import { useFormFields, Validators } from "@/hooks/use-form-fields";
import { useTransition } from "react";

interface LoginSchema {
    email: string,
    password: string
}

const validators: Validators<LoginSchema> = {
    email: (value)=>{
        if(!value) return "El email es requerido"
        else return null
    },
    password: (value)=>{
        if(!value) return "La contraseña es requerida"
        else if(value.length < 6) return "La constraseña debe tener al menos 6 caracteres"
        else return null
    }
}


const LoginForm = () => {
    const [loadingLogin, startLoadingLogin] = useTransition()
    const {handleSubmit, setFieldValue, fields} = useFormFields<LoginSchema>({
        email: "",
        password: ""
    }, validators)

    const onSubmit = (data: LoginSchema)=>{
        console.log(data)
        startLoadingLogin(async()=>{
            const formData = new FormData()
            formData.append("email", data.email)
            formData.append("password", data.password)
            await loginWithCredentials(formData)
        })
    }

    return ( 
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="min-h-fit py-2 px-8 flex flex-col justify-center items-start w-full lg:w-1/2 xl:w-[40%]">
            <Logo className="flex mb-4 md:hidden"/>
            <h1 className="text-primary text-3xl">Iniciar Sesión</h1>
            <h2 className="text-black text-lg">Sigue honrando la memoria de tus seres queridos.</h2>
            
            <form onSubmit={e=>handleSubmit(e, onSubmit)} className="w-full mt-8 space-y-4">
                <Field
                    label="Email"
                    type="email"
                    classNameContainer="w-full"
                    placeholder="user@gmail.com"
                    onChange={e=>setFieldValue("email", e.target.value)}
                    value={fields.email.value}
                    error={fields.email.error}
                />
                <FieldPassword
                    label="Contraseña"
                    classNameContainer="w-full"
                    placeholder="*******"
                    onChange={e=>setFieldValue("password", e.target.value)}
                    value={fields.password.value}
                    error={fields.password.error}
                    
                />
                <ButtonPrimary isLoading={loadingLogin} disabled={loadingLogin} className="w-full">
                    Iniciar sesión
                </ButtonPrimary>
            </form>
            <div className="flex w-full my-8 gap-1 items-center">
                <div className="h-[1px] rounded-ms w-full bg-gray-light"/>
                <span className="text-sm font-light text-gray-light">O</span>
                <div className="h-[1px] rounded-ms w-full bg-gray-light"/>
            </div>
            <ButtonGoogle onClick={async()=>signInWithGoogle()} className="w-full mt-2 mb-4">
                Iniciar con Google
            </ButtonGoogle>
            <p className="text-sm">Si no tienes una cuenta, <Link href={"/register"} className="text-primary">Registrate</Link></p>
        </motion.div>
     );
}
 
export default LoginForm;