import { Timestamp } from "firebase/firestore"

export interface Biography{
    id: string
    userId: string
    photoPerson: string
    name: string
    dateOfBirth: Date
    dateOfDeath: Date
    biographyDescription: string
    mainMessage: string
    photos: string[]
    videos: string[]
    messages: string[]
    statusPayment: string
}

export type StatusPayment = "pagado"  | "enviando" | "enviado" | "generando"

export interface BiographyPayment{
    id: string
    name: string
    userId: string
    bioId: string
    createAt: Date
    status: StatusPayment
    amount: number
    codigo: string
}