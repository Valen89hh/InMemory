"use client"

import Card from "@/components/cards/card";
import Container from "@/components/containers/container";
import Image from "next/image";
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Label from "@/components/form/label";
import Field from "@/components/form/field";
import ButtonPrimary from "@/components/buttons/button-primary";
import FieldArea from "@/components/form/field-area";
import { useFormFields, Validators } from "@/hooks/use-form-fields";
import { isPhoneNumber } from "@/lib/utils/regex-format";
import FieldCall from "@/components/form/field-call";


interface ContactSchema{
    name: string,
    email: string
    telefono: string
    mensaje: string
}

const validators: Validators<ContactSchema> = {
    name: (value)=> !value ? "El nombre es requerido" : null,
    email: (value)=> !value ? "El email es requerido" : null,
    mensaje: (value)=> !value ? "El mensage es requerido" : null,
    telefono: (value)=>{
        if(!value) return "El telefono es requerido"
        else if(!isPhoneNumber(value)) return "El telefono es invalido"
        else return null
    },
}

const ContactPage = () => {

    const {fields, setFieldValue, handleSubmit} = useFormFields<ContactSchema>({
        name: "",
        email: "",
        mensaje: "",
        telefono: ""
    }, validators)

    const onSubmit = (data: ContactSchema) =>{
        console.log(data)
    };

    return ( 
        <Container className="py-[8rem]">
            <main className="w-full space-y-6">
                <div className="flex flex-col justify-center items-center">
                    <h2 className="text-primary text-center text-[2.5rem] xs:text-[3rem] uppercase">Cont&aacute;nos</h2>
                    <h3 className="text-black text-center text-[1.7rem]">Estamos aqu&iacute; para ayudarte</h3>
                </div>
                <Card className="flex p-6 gap-4 flex-col md:flex-row md:justify-between">
                    <Image
                        alt="contact"
                        src={"/img/contact.jpg"}
                        width={3264}
                        height={4896}
                        className="w-full h-[20rem] md:h-full md:w-[40%]  object-cover"
                    />
                    <form className="w-full space-y-4 flex flex-col md:w-[50%]" onSubmit={e=>handleSubmit(e, onSubmit)}>
                        <Field 
                            label="Nombre"
                            placeholder="Ingresa tu nombre" 
                            value={fields.name.value}
                            error={fields.name.error} 
                            onChange={e=>setFieldValue("name", e.target.value)}
                        />
                        <Field 
                            label="Email"
                            placeholder="Ingresa tu email" 
                            value={fields.email.value}
                            error={fields.email.error} 
                            onChange={e=>setFieldValue("email", e.target.value)}
                        />
                        <FieldCall
                            label="Teléfono"
                            placeholder="+51" 
                            value={fields.telefono.value}
                            error={fields.telefono.error} 
                            onChangeValue={value=>setFieldValue("telefono", value)}
                        />

                        <FieldArea 
                            label="Mensaje"
                            placeholder="Ingresa tu mensaje" 
                            value={fields.mensaje.value}
                            error={fields.mensaje.error} 
                            onChange={e=>setFieldValue("mensaje", e.target.value)}
                        />                   
                                                
                        <ButtonPrimary className="self-end w-full sm:w-[40%]">
                            Enviar
                        </ButtonPrimary>
                    </form>
                </Card>
            </main>
        </Container>
     );
}
 
export default ContactPage;