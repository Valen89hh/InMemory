"use client"

import ButtonPrimary from "@/components/buttons/button-primary";
import Card from "@/components/cards/card";
import Field from "@/components/form/field";
import FieldSelect from "@/components/form/field-select";
import SelectImage from "@/components/form/select-image";
import { useUbigeo } from "@/hooks/use-ubigeo";
import { useSettingForm } from "../hooks/use-setting-form";
import { Profile } from "@/lib/supabase/models";
import FieldCall from "@/components/form/field-call";

const SettingUser = ({profile}: {profile: Profile}) => {
    const {
        departamentos, 
        provincias, 
        distritos, 
        onChangeDepartamento, 
        onChangeProvincia
    } = useUbigeo(profile.departament, profile.province)
    const {onHandleSubmit, fields,setFieldValue, loadingSave} = useSettingForm(profile)

    return ( 
        <Card className="w-full flex flex-col justify-center items-center">
            <h3 className="text-primary text-3xl mb-[2rem]">Configuraci&oacute;n</h3>

            <form onSubmit={onHandleSubmit} className="w-full space-y-4 flex flex-col md:w-3/4 lg:w-1/2">
                <SelectImage  
                    shape="circle" 
                    dataImage={fields.image.value}
                    error={fields.image.error}
                    className="w-[10rem] h-[10rem] xs:w-[15rem] xs:h-[15rem]"  
                    onChangeImage={(data)=>setFieldValue("image", data)}
                />
                
                <Field  
                    label="Nombre Completo"
                    placeholder="Ingrese su nombre" 
                    value={fields.name.value}
                    error={fields.name.error}
                    onChange={e=>setFieldValue("name", e.target.value)}
                />

                <Field  
                    
                    label="Apellidos"
                    placeholder="Ingrese sus apellidos" 
                    value={fields.lastName.value}
                    error={fields.lastName.error}
                    onChange={e=>setFieldValue("lastName", e.target.value)}
                />

                <Field  
                    readOnly
                    disabled
                    type="email"
                    label="Email"
                    placeholder={fields.email.value} 
                />

                <FieldCall  
                    label="Telefono"
                    placeholder="+51" 
                    value={fields.phone.value}
                    error={fields.phone.error}
                    onChangeValue={value=>setFieldValue("phone", value)} 
                />

                <Field  
                    label="Empresa (Opcional)"
                    placeholder="Ingrese su empresa" 
                    value={fields.company.value}
                    error={fields.company.error}
                    onChange={e=>setFieldValue("company", e.target.value)}
                />
                <Field  
                    label="Dirección"
                    placeholder="Ingrese su dirección" 
                    value={fields.address.value}
                    error={fields.address.error}
                    onChange={e=>setFieldValue("address", e.target.value)}
                />

                <FieldSelect 
                    label="País"
                    placeholder="País"
                    options={[{key: "perú", value: "Perú"}]} 
                    value={fields.country.value}
                    error={fields.country.error}
                    onChange={e=>setFieldValue("country", e.target.value.toLowerCase())}
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
                        value={fields.provincia.value}
                        error={fields.provincia.error}
                    />
                    <FieldSelect 
                        label="Distrito"
                        placeholder="Distrito"
                        options={distritos} 
                        onChange={e=>setFieldValue("distrito", e.target.value.toLowerCase())}
                        onChangeOption={value=>setFieldValue("distrito", value)}
                        value={fields.distrito.value}
                        error={fields.distrito.error} 
                    />
                </div>
                
                <ButtonPrimary disabled={loadingSave} isLoading={loadingSave} className="self-end flex justify-center items-center gap-2">
                    Guardar
                </ButtonPrimary>
            </form>
        </Card>
     );
}
 
export default SettingUser;