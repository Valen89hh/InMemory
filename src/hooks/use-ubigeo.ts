import { FieldOption } from "@/components/form/field-select"
import { getDepartamentos, getDisitritos, getKeyDepartamento, getKeyProvincia, getProvincias } from "@/lib/data/ubigeo/ubigeo-data"
import { useEffect, useState } from "react"

export function useUbigeo(departament: string | null = null, province: string | null = null){
    const [idDepartamento, setIdDepartamento] = useState<string | null>(getKeyDepartamento(departament ?? ""))
    const [idProvincia, setIdProvincia] = useState<string | null>(getKeyProvincia(province ?? ""))
    const [departamentos, setDepartamentos] = useState(getDepartamentos())
    const [provincias, setProvincias] = useState<FieldOption[]>([])
    const [distritos, setDistritos] = useState<FieldOption[]>([])

    useEffect(()=>{
        setProvincias(getProvincias(idDepartamento))
    }, [idDepartamento])

    useEffect(()=>{
        setDistritos(getDisitritos(idProvincia))
    }, [idProvincia])



    const onChangeDepartamento = (key: string)=>{
        setIdDepartamento(key)
    }

    const onChangeProvincia = (key: string)=>{
        setIdProvincia(key)
    }

    return {
        departamentos,
        provincias,
        distritos,
        onChangeDepartamento,
        onChangeProvincia
    }

}