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


interface IFormContact{
    name: string,
    email: string
    telefono: string
    mensaje: string
}

const ContactSchema = Yup.object().shape({
    name: Yup.string().required("Nombre requerido"),
    email: Yup.string().email("Email invalido").required("Email requerido"),
    telefono: Yup.string()
        .matches(/^[0-9]+$/, "Debe ser un número")
        .min(9, "Debe tener al menos 9 dígitos")
        .required("Teléfono requerido"),
    mensaje: Yup.string().min(10, "Muy corto").max(250, "Muy largo").required("Mensaje requerido")
})

const ContactPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<IFormContact>({
        resolver: yupResolver(ContactSchema),
    });

    const onSubmit: SubmitHandler<IFormContact> = (data) =>{
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
                    <form className="w-full flex flex-col md:w-[50%]" onSubmit={handleSubmit(onSubmit)}>
                        <Label>Nombre</Label>
                        <Field placeholder="Ingresa tu nombre" {...register('name')} error={errors.name?.message} className="w-full"  classNameContainer="mb-6"/>
                        
                        <Label>Email</Label>
                        <Field placeholder="Ingresa tu email" {...register('email')} error={errors.email?.message} className="w-full"  classNameContainer="mb-6"/>
                        
                        <Label>Telefono</Label>
                        <Field type="tel" placeholder="Ingresa tu telefono" {...register('telefono')} error={errors.telefono?.message} className="w-full"  classNameContainer="mb-6"/>
                        
                        <Label>Mensaje</Label>
                        <FieldArea placeholder="Ingresa tu mensaje" {...register('mensaje')} error={errors.mensaje?.message} className="w-full h-[10rem]" classNameContainer="mb-6"/>
                        
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