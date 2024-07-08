"use client"

import ButtonOutline from "@/components/buttons/button-outline";
import ButtonPrimary from "@/components/buttons/button-primary";
import Field from "@/components/form/field";
import Label from "@/components/form/label";
import ErrorToast from "@/components/toast/error-toast";
import SuccessToast from "@/components/toast/sucess-toast";
import { getBiographyById, getPaymentById, getUser, updatePayment } from "@/lib/firebase";
import { Biography, BiographyPayment } from "@/lib/models/biography-model";
import { User } from "@/lib/models/user-model";
import { CircularProgress, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";

const PaymentAdminPage = ({params}: {params: {payId: string}}) => {
    const [bioPay, setBioPay] = useState<BiographyPayment>()
    const [biography, setBiography] = useState<Biography>()
    const [user, setUser] = useState<User>()
    const [status, setStatus] = useState("")
    const [codeSend, setCodeSend] = useState("")
    const router = useRouter()
    const [loadingSave, startLoadingSave] = useTransition()
    const [loading, startLoading] = useTransition()
    useEffect(()=>{
        startLoading(async()=>{
            const resPay = await getPaymentById(params.payId)
            if(resPay.payment){
                setBioPay(resPay.payment)
                setStatus(resPay.payment.status)
                setCodeSend(resPay.payment.codigo)
                const resBio = await getBiographyById(resPay.payment.bioId)
                if(resBio.biography){
                    setBiography(resBio.biography)
                }
                const resUser = await getUser(resPay.payment.userId)
                console.log(resUser)
                if(resUser){
                    setUser(resUser)
                }
            }
        })
    }, [])

    const onSubmit = (e: FormEvent)=>{
        e.preventDefault()
        if(status && bioPay){
            console.log("Enviando")
            startLoadingSave(async()=>{
                const res = await updatePayment(bioPay.id, status, codeSend)
                if(res.success) {
                    toast.custom((t)=><SuccessToast t={t} msg={res.success}/>)
                    router.push("/admin")
                }
                else if(res.error) toast.custom((t)=><ErrorToast t={t} msg={res.error}/>)
            
            })
        }
    }

    const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
      };
    
    if(loading){
        return <section className="w-full h-screen flex justify-center items-center">
            <CircularProgress color="primary"/>
        </section>
    }

    if(!bioPay && !biography && !user){
        return <section className="w-screen h-screen flex justify-center items-center">
            <h1>No existe niguna informaci&oacute;n</h1>
        </section>
    }
    
    return ( 
        <main className="bg-white p-6 grid gap-8 grid-cols-1 md:grid-cols-2">
            <div className="space-y-4">
                <Image
                    src={user?.photoURL ?? ""}
                    alt={user?.displayName ?? ""}
                    width={500}
                    height={500}
                    className=" object-cover h-[10rem] w-[10rem] rounded-full"
                />
                <div>
                    <Label>Nombre</Label>
                    <Field readOnly value={user?.displayName ?? ""}/>
                </div>
                <div>
                    <Label>Apellido Paterno</Label>
                    <Field readOnly value={user?.appellidoPaterno ?? ""}/>
                </div>
                <div>
                    <Label>Apellido Materno</Label>
                    <Field readOnly value={user?.appellidoMaterno ?? ""}/>
                </div>
                <div>
                    <Label>DNI</Label>
                    <Field readOnly value={user?.dni ?? ""}/>
                </div>
                <div>
                    <Label>Email</Label>
                    <Field readOnly value={user?.email ?? ""}/>
                </div>
                <div>
                    <Label>Direcci&oacute;n</Label>
                    <Field readOnly value={`${user?.country} / ${user?.state} / ${user?.province} / ${user?.district} / ${user?.address}`}/>
                </div>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
                <Image
                    src={biography?.photoPerson ?? ""}
                    alt={biography?.name ?? ""}
                    width={500}
                    height={500}
                    className=" object-cover h-[20rem] w-full"
                />
                <div>
                    <Label>Nombre Biograf&iacute;a</Label>
                    <Field readOnly className="uppercase" value={biography?.name ?? ""}/>
                </div>
                <div>
                    <Label>Url Biograf&iacute;a</Label>
                    <Field readOnly value={`${window.location.protocol}//${window.location.host}/biography/${biography?.id}`}/>
                </div>
                <div>
                    <InputLabel id="code-send">Codigo De Envio</InputLabel>
                    <TextField value={codeSend} onChange={e=>setCodeSend(e.target.value)} id="code-send" label="Outlined" variant="outlined" />
                </div>


                <div>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Status" 
                        defaultValue={bioPay?.status ?? ""}
                        onChange={handleChange}
                        >
                        <MenuItem value={"pagado"}>Pagado</MenuItem>
                        <MenuItem value={"enviando"}>Enviando</MenuItem>
                        <MenuItem value={"enviado"}>Enviado</MenuItem>
                        <MenuItem value={"generando"}>Generando</MenuItem>
                    </Select>
                </div>

                <div className="flex flex-col xxs:flex-row gap-4">
                        <ButtonPrimary disabled={loadingSave} className="flex text-center justify-center items-center gap-2">
                            {loadingSave ? (
                                <>
                                    <CircularProgress size={20} color="inherit" />
                                    <span>Guardando</span>
                                </>
                            ) : (
                                <span >Guardar</span>
                            )}
                        </ButtonPrimary>
                        <ButtonOutline type="button" onClick={() => {
                                router.push("/admin")
                            }} disabled={loadingSave}>
                            Volver
                        </ButtonOutline>
                    </div>
            </form>
        </main>
     );
}
 
export default PaymentAdminPage;