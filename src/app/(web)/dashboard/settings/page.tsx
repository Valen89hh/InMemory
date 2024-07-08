"use client"

import Card from "@/components/cards/card";
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Label from "@/components/form/label";
import SelectImage from "@/components/form/select-image";
import Field from "@/components/form/field";
import ButtonPrimary from "@/components/buttons/button-primary";
import { useState } from "react";
import { useAuthStore } from "@/lib/storage/auth-storage";
import { uploadImage } from "@/lib/firebase";
import toast from "react-hot-toast";
import CircularProgress from '@mui/material/CircularProgress';
import SuccessToast from "@/components/toast/sucess-toast";
import ErrorToast from "@/components/toast/error-toast";
import { generateUniqueId } from "@/utils/uid";



const SettingSchemea = Yup.object().shape({
    name: Yup.string().required("Nombre requerido"),
    telefono: Yup.string()
        .matches(/^[0-9]+$/, "Debe ser un número")
        .min(9, "Debe tener al menos 9 dígitos")
        .required("Teléfono requerido"),
    pais: Yup.string().required("País requerido"),
    departamento: Yup.string().required("Departamento requerido"),
    provincia: Yup.string().required("Provincia requerido"),
    distrito: Yup.string().required("Distrito requerido"),
    direccion: Yup.string().required("Dirección requerido"),
    apellidoPaterno: Yup.string().required("Apellido Paterno requerido"),
    apellidoMaterno: Yup.string().required("Apellido Materno requerido"),
    dni: Yup.string()
    .matches(/^[0-9]+$/, "Debe ser un número")
    .min(8, "Debe tener al menos 9 dígitos")
    .required("DNI requerido"),
});


interface IFormSetting extends Yup.InferType<typeof SettingSchemea> {}

const SettingsPage = () => {

    const [file, setFile] = useState<File|null>(null)
    const [errorImg, setErrorImg] = useState<string>("")
    const {user, updateUserProfile} = useAuthStore()
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<IFormSetting>({
        resolver: yupResolver(SettingSchemea),
        values: {
            name: user?.displayName ?? "",
            telefono: user?.phone ?? "",
            pais: user?.country ?? "",
            departamento: user?.state ?? "",
            distrito: user?.district ?? "",
            provincia: user?.province ?? "",
            direccion: user?.address ?? "",
            apellidoMaterno: user?.appellidoMaterno ?? "",
            apellidoPaterno: user?.appellidoPaterno ?? "",
            dni: user?.dni ?? "",
        }
    });

    const onSubmit: SubmitHandler<IFormSetting> = async(data) =>{
        console.log("Entre")
        if(file && user){
            setLoading(true)

            console.log({...data, image: file})
            const subPhat = `${user.uid}/image-${generateUniqueId()}`
            
            uploadImage(subPhat, file, {
                async onSuccessUpload(url) {
                    toast.custom((t)=>(
                        <SuccessToast t={t} msg="Imagen subida correctamente"/>
                    ))
                    setFile(null)
                    const res = await updateUserProfile({
                        uid: user.uid,
                        displayName: data.name,
                        phone: data.telefono,
                        country: data.pais,
                        state: data.departamento,
                        province: data.provincia,
                        address: data.direccion,
                        photoURL: url,
                        email: user.email,
                        district: data.distrito,
                        appellidoMaterno: data.apellidoMaterno,
                        appellidoPaterno: data.apellidoPaterno,
                        dni: data.dni,
                        role: user.role
                    })

                    if(res.error){
                        toast.custom((t)=>(
                            <ErrorToast t={t} msg={res.error}/>
                        ))
                    }else if(res.success){
                        toast.custom((t)=>(
                            <SuccessToast t={t} msg={res.success}/>
                        ))
                    }

                },
                onErrorUpload(err) {
                    
                },
                onProgressUpload(progress) {
                    
                },
            })
            
        }else{
            if(user?.photoURL){
                setLoading(true)

                const res = await updateUserProfile({
                    uid: user.uid,
                    displayName: data.name,
                    phone: data.telefono,
                    country: data.pais,
                    state: data.departamento,
                    province: data.provincia,
                    address: data.direccion,
                    photoURL: user.photoURL,
                    email: user.email,
                    district: data.distrito,
                    appellidoMaterno: data.apellidoMaterno,
                    appellidoPaterno: data.apellidoPaterno,
                    dni: data.dni,
                    role: user.role
                })
                
                if(res.error){
                    toast.custom((t)=>(
                        <ErrorToast t={t} msg={res.error}/>
                    ))
                }else if(res.success){
                    toast.custom((t)=>(
                        <SuccessToast t={t} msg={res.success}/>
                    ))
                }
            }else{

                setErrorImg("Imagen requerida")
            }
        }
        setLoading(false)
    };


    return ( 
        <Card className="w-full flex flex-col justify-center items-center">
            <h3 className="text-primary text-3xl mb-[2rem]">Configuraci&oacute;n</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col md:w-3/4 lg:w-1/2">
                <Label>Image</Label>
                <SelectImage src={user?.photoURL??""} shape="circle" className="w-[10rem] h-[10rem] xs:w-[15rem] xs:h-[15rem]"  onSelectFile={(file)=>{
                    setFile(file)
                    setErrorImg("")
                }} error={errorImg} classNameContainer="mb-4"/>
                
                <Label>Nombre Completo</Label>
                <Field  classNameContainer="mb-4" placeholder="Ingrese su nombre" {...register('name')} error={errors.name?.message} />
                
                <Label>Apellido Paterno</Label>
                <Field  classNameContainer="mb-4" placeholder="Ingrese su apellido paterno" {...register('apellidoPaterno')} error={errors.apellidoPaterno?.message} />
                
                <Label>Apellido Materno</Label>
                <Field  classNameContainer="mb-4" placeholder="Ingrese su apellido materno" {...register('apellidoMaterno')} error={errors.apellidoMaterno?.message} />
                
                <Label>Email</Label>
                <Field defaultValue={user?.email ?? ""} classNameContainer="mb-4" placeholder="Ingrese su email" readOnly/>
                
                <Label>Telefono</Label>
                <Field classNameContainer="mb-4" placeholder="Ingrese su telefono" {...register('telefono')} error={errors.telefono?.message} />
                
                <Label>DNI</Label>
                <Field classNameContainer="mb-4" placeholder="Ingrese su DNI" {...register('dni')} error={errors.dni?.message} />
                
                <Label>Pa&iacute;s</Label>
                <Field classNameContainer="mb-4" placeholder="Ingrese su pais" {...register('pais')} error={errors.pais?.message} />
                
                <Label>Departamento</Label>
                <Field classNameContainer="mb-4" placeholder="Ingrese su departamento" {...register('departamento')} error={errors.departamento?.message} />
                
                <Label>Provincia</Label>
                <Field classNameContainer="mb-4" placeholder="Ingrese su provincia" {...register('provincia')} error={errors.provincia?.message} />
                
                <Label>Distrito</Label>
                <Field classNameContainer="mb-4" placeholder="Ingrese su disitro" {...register('distrito')} error={errors.distrito?.message} />
                
                <Label>Direcci&oacute;n</Label>
                <Field classNameContainer="mb-4" placeholder="Ingrese su dirección" {...register('direccion')} error={errors.direccion?.message} />

                <ButtonPrimary disabled={loading} className="self-end flex justify-center items-center gap-2">
                    {loading && (
                        <CircularProgress size={20} color="inherit"/>
                    )}
                    Guardar
                </ButtonPrimary>
            </form>
        </Card>
     );
}
 
export default SettingsPage;