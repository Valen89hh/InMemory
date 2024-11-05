import { MessagesState } from "@/features/biographies/hooks/use-messages";
import { Database } from "./types";
import { DataResultUpload } from "@/features/biographies/actions";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type Biography = Database["public"]["Tables"]["biographies"]["Row"]
export type Order = Database["public"]["Tables"]["orders"]["Row"]
export type Message = Database["public"]["Tables"]["messages"]["Row"]
export type Product = Database["public"]["Tables"]["products"]["Row"]
export type PhotoBiography = Database["public"]["Tables"]["images_biographies"]["Row"]
export type VideoBiography = Database["public"]["Tables"]["videos_biographies"]["Row"]


export type Role = Database["public"]["Enums"]["Role"]
export type OrderStatus = Database["public"]["Enums"]["Order_Status"]

export interface BiographyForEdit extends Biography{
    messages: Message[]
    photos: PhotoBiography[]
    videos: VideoBiography[]
}

export interface BiographyForView extends Biography{
    messages: Message[],
    photos: string[],
    videos: string[]
}

export interface OrdersForTable extends Order{
    nameBiography: string,
    photoBiography: string
}