import departamentos from "./departamentos.json"
import provincias from "./provincias.json"
import distritos from "./distritos.json"
import { FieldOption } from "@/components/form/field-select"

export function getDepartamentos(){
    return departamentos.map(dp=>{
        const dpOpt: FieldOption = {
            key: dp.id,
            value: dp.name
        }
        return dpOpt
    })
}

export function getKeyDepartamento(departamento: string){
    const id = departamentos.find(dp=>dp.name.toLowerCase() == departamento.toLowerCase())?.id
    return id ?? null
}

export function getKeyProvincia(provincia: string){
    const id = provincias.find(pr=>pr.name.toLowerCase() == provincia.toLowerCase())?.id
    return id ?? null
}

export function getProvincias(idDepartamento: string | null){
    if(idDepartamento){
        const filterPr = provincias.filter(pr=>pr.department_id === idDepartamento)
        return filterPr.map(pr=>{
            const prOpt: FieldOption = {
                key: pr.id,
                value: pr.name
            }
            return prOpt
        })
    }
    return [] 
}
export function findIdProvincia(idDepartamento: string | null){
    if(idDepartamento){
        const pr = provincias.find(pr=>pr.department_id === idDepartamento)
        if(pr){
            return pr.id
        }
        return null
    }
    return null
}

export function getDisitritos(idProvincia: string | null){
    if(idProvincia){
        const filterPr = distritos.filter(dis=>dis.province_id === idProvincia)
        return filterPr.map(pr=>{
            const prOpt: FieldOption = {
                key: pr.id,
                value: pr.name
            }
            return prOpt
        })
    }
    return [] 
}