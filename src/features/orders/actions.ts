"use server"

import { OrdersForTable } from "@/lib/supabase/models"
import { createClient } from "@/lib/supabase/server"
import { Result } from "@/lib/utils/response"


export const getOrderForTableByUser = async(): Promise<Result<OrdersForTable[]>>=>{
    const supabase = createClient()

    const {data: {user}} = await supabase.auth.getUser()
    if(!user) return {success: false, error: "No hay usuario authenticado"}

    const {
        data: orders,
        error: errorOrders
    } = await supabase
        .from("orders")
        .select("*, biographies(name_person, photo_person)")
        .eq("user_id", user.id)
        .order("created_at", {ascending: false})
    
    if(errorOrders) return {success: false, error: errorOrders.message}
    if(!orders) return {success: false, error: "No hay ordenes creadas"}

    return {
        success: true,
        data: orders.map(order=>({
            ...order,
            nameBiography: order.biographies?.name_person ?? "",
            photoBiography: order.biographies?.photo_person ?? ""
        }))
    }
}