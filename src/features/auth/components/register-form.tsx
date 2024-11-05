"use client"

import ButtonGoogle from "@/components/buttons/button-google";
import Logo from "@/components/logo";
import { registerWithCredentials, signInWithGoogle } from "../actions";
import Field from "@/components/form/field";
import FieldPassword from "@/components/form/field-password";
import ButtonPrimary from "@/components/buttons/button-primary";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useFormFields, Validators } from "@/hooks/use-form-fields";
import { useTransition } from "react";

interface RegisterSchema {
    name: string,
    email: string,
    password: string
}

const validators: Validators<RegisterSchema> = {
    name: (value)=> !value ? "El nombre es requerido" : null,
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


const RegisterForm = () => {
    const [loadingRegister, startLoadingRegister] = useTransition()
    const {handleSubmit, setFieldValue, fields} = useFormFields<RegisterSchema>({
        name: "",
        email: "",
        password: ""
    }, validators)

    const onSubmit = (data: RegisterSchema)=>{
        console.log(data)
        startLoadingRegister(async()=>{
            const formData = new FormData()
            formData.append("name", data.name)
            formData.append("email", data.email)
            formData.append("password", data.password)
            await registerWithCredentials(formData)
        })
    }
    return ( 
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="min-h-fit py-2 px-8 flex flex-col justify-center items-start w-full lg:w-1/2 xl:w-[40%]">
            <Logo className="flex mb-4 md:hidden"/>
            <h1 className="text-primary text-3xl">Registrarse</h1>
            <h2 className="text-black text-lg">Empieza a crear y compartir biografías que perduren.</h2>
            
            <form onSubmit={e=>handleSubmit(e, onSubmit)} className="w-full mt-8 space-y-4">
                <Field
                    label="Nombre"
                    classNameContainer="w-full"
                    placeholder="username"
                    onChange={e=>setFieldValue("name", e.target.value)}
                    value={fields.name.value}
                    error={fields.name.error}
                />
                <Field
                    label="Email"
                    classNameContainer="w-full"
                    type="email"
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
                <ButtonPrimary isLoading={loadingRegister} disabled={loadingRegister} className="w-full">
                    Registrarse
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
            <p className="text-sm">Si ya tienes una cuenta, <Link href={"/login"} className="text-primary">Inicia sesión</Link></p>
        </motion.div>
     );
}
 
export default RegisterForm;