"use server"
import { mercadopago } from "@/lib/mercado-pago"
import { Preference } from "mercadopago"
import { Biography, Order, Product, Profile } from "@/lib/supabase/models"
import { createClient } from "@/lib/supabase/server"
import { Result } from "@/lib/utils/response"
import { CheckoutInformationSchema } from "./hooks/use-checkout-information-form"

interface BackUrls{
    success: string
    failure: string
}

export const createOrder = async(biography: Biography, amount: number, back_urls: BackUrls): Promise<Result<string>>=>{
    const supabase = createClient()
    const {data: {user}} = await supabase.auth.getUser()
    if(!user) return {success: false, error: "Usuario no encontrado"}

    const {
        data: product,
        error: errorProduct
    } = await supabase
        .from("products")
        .select()
        .eq("id", "d40f9e93-de0e-4015-8be6-eb0b71bdddac")
        .maybeSingle()

    if(errorProduct) return {success: false, error: errorProduct.message}
    if(!product) return {success: false, error: "No se encontro un producto de venta"}

    const subTotalCost = (product.price*amount)
    const shippingCost = subTotalCost < 200 ? 10 : 0
    const totalCost = parseFloat((subTotalCost + shippingCost).toFixed(2))

    const {
        data: order,
        error: errorOrder
    } = await supabase
        .from("orders")
        .insert({
            biography_id: biography.id,
            user_id: user.id,
            price: product.price,
            amount: amount,
            total_cost: totalCost,
            shipping_cost: shippingCost
        })
        .select()
        .maybeSingle()

    if(errorOrder) return {success: false, error: errorOrder.message}
    if(!order) return {success: false, error: "No se pudo obtener la orden"}

    const preference = await new Preference(mercadopago)
        .create({
            body: {
                items: [
                    {
                        id: biography.id,
                        title: biography.name_person,
                        quantity: 1,
                        unit_price: order.total_cost
                    }
                ],
                back_urls: {
                    success: back_urls.success,
                    failure: back_urls.failure
                },
                metadata:{
                    id_order: order.id,
                    id_biograhy: biography.id
                }
            }
        })


    if(!preference.id) return {success: false, error: "No se pudo cargar el metodo de pago"}
    
    return {
        success: true,
        data: preference.id
    }

}

export const getProductPrice = async(): Promise<Result<Product>>=>{
    const supabase = createClient()

    const {
        data: product,
        error: errorProduct
    } = await supabase
        .from("products")
        .select()
        .eq("id", "d40f9e93-de0e-4015-8be6-eb0b71bdddac")
        .maybeSingle()

    if(errorProduct) return {success: false, error: errorProduct.message}
    if(!product) return {success: false, error: "No hay producto qr"}

    return {
        success: true,
        data: product
    }
}   

export const updateInformationProfile = async(data: CheckoutInformationSchema): Promise<Result<Profile>>=>{
    const supabase = createClient()
    const {data: {user}} = await supabase.auth.getUser()
    if(!user) return {success: false, error: "Usuario no encontrado"}

    const {
        data: profile,
        error: errorProfile
    } = await supabase
        .from("profiles")
        .update({
            first_name: data.nombre,
            last_name: data.apellidos,
            phone: data.telefono,
            departament: data.departamento,
            province: data.provincia,
            district: data.distrito,
            company: data.empresa,
            country: data.pais,
            address: data.direccion
        })
        .eq("id", user.id)
        .select()
        .maybeSingle()
    
    if(errorProfile) return {success: false, error: errorProfile.message}
    if(!profile) return {success: false, error: "No se puedo obtener el perfil"}

    return {
        success: true,
        data: profile
    }
}