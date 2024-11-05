"use client"

import { useUbigeo } from "@/hooks/use-ubigeo"
import { useCheckoutInformationForm } from "../hooks/use-checkout-information-form"
import { Profile } from "@/lib/supabase/models"
import { Subtitle } from "./subtitle"
import Field from "@/components/form/field"
import FieldSelect from "@/components/form/field-select"
import FieldCall from "@/components/form/field-call"
import ButtonPrimary from "@/components/buttons/button-primary"

export const CheckoutInformation = ({profile}: {profile: Profile}) => {

    const {
        departamentos, 
        provincias, 
        distritos, 
        onChangeDepartamento, 
        onChangeProvincia
    } = useUbigeo(profile.departament, profile.province)
    const {onHandleSubmit, fields,setFieldValue, loadingSave} = useCheckoutInformationForm(profile)



    return ( 
        <form className="h-full overscroll-y-none" onSubmit={onHandleSubmit}>
            <Subtitle className="mt-4">Contacto</Subtitle>
            <Field 
                placeholder="Correo"
                value={fields.email.value}
                error={fields.email.error} 
                onChange={e=>setFieldValue("email", e.target.value)}
            />

            <Subtitle className="mt-4">Direcci&oacute;n de Env&iacute;o</Subtitle>
            <div className="space-y-4">
                <FieldSelect 
                    label="País / Región"
                    placeholder="País / Región"
                    options={[{key: "peru", value: "Perú"}]} 
                    onChangeOption={value=>setFieldValue("pais", value)}
                    error={fields.pais.error}
                    value={fields.pais.value}
                />
                <div className="flex gap-4">
                    <Field 
                        label="Nombre"
                        placeholder="Nombre"
                        
                        classNameContainer="w-full"
                        value={fields.nombre.value}
                        error={fields.nombre.error} 
                        onChange={e=>setFieldValue("nombre", e.target.value)}
                    />
                    <Field 
                        label="Apellidos"
                        placeholder="Apellidos"
                        value={fields.apellidos.value}
                        error={fields.apellidos.error} 
                        onChange={e=>setFieldValue("apellidos", e.target.value)}
                    />
                </div>
                <Field 
                    label="Empresa"
                    placeholder="Empresa"
                    value={fields.empresa.value}
                    error={fields.empresa.error} 
                    onChange={e=>setFieldValue("empresa", e.target.value)}
                />
                <Field 
                    placeholder="Dirección"
                    label="Dirección"
                    value={fields.direccion.value}
                    error={fields.direccion.error} 
                    onChange={e=>setFieldValue("direccion", e.target.value)}
                />
                <div className="flex gap-4">
                    <FieldSelect 
                        label="Departamento"

                        placeholder="Departamento"
                        onChangeOption={onChangeDepartamento}
                        onChange={e=>setFieldValue("departamento", e.target.value.toLowerCase())} 
                        options={departamentos} 
                        value={fields.departamento.value}
                        error={fields.departamento.error} 
                    />
                    <FieldSelect 
                        label="Provincia"
                        placeholder="Provincia"
                        onChangeOption={onChangeProvincia} 
                        onChange={e=>setFieldValue("provincia", e.target.value.toLowerCase())}
                        options={provincias} 
                        error={fields.provincia.error} 
                        value={fields.provincia.value}
                    />
                    <FieldSelect 
                        label="Distrito"
                        placeholder="Distrito"
                        options={distritos} 
                        error={fields.distrito.error}
                        value={fields.distrito.value}
                        onChange={e=>setFieldValue("distrito", e.target.value.toLowerCase())}
                        onChangeOption={value=>setFieldValue("distrito", value)} 
                    />
                </div>
                <FieldCall 
                    label="Telefono"
                    placeholder="+51"
                    value={fields.telefono.value}
                    error={fields.telefono.error}
                    onChangeValue={value=>setFieldValue("telefono", value)} 
                />
            </div>
            <div className="flex gap-4 flex-col-reverse sm:flex-row items-center justify-between mt-4">

                <ButtonPrimary isLoading={loadingSave} disabled={loadingSave} className=" w-full sm:w-fit">
                    Continuar con envios
                </ButtonPrimary>
            </div>
        </form>
     );
}