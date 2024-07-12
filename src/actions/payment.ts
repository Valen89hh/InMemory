"use server"

import { mercadopago } from "@/lib/mercado-pago"
import { Preference } from "mercadopago"
import { redirect } from "next/navigation"

interface BackUrls{
    success: string
    failure: string
}

export const buyBiography = async(title: string, bioId: string, userId: string, back_urls: BackUrls)=>{
    
    console.log(title, bioId, userId)
    const preference = await new Preference(mercadopago)
        .create({
            body: {
                items: [
                    {
                        id: "Biography",
                        title: title,
                        quantity: 1,
                        unit_price: 8
                    }
                ],
                metadata: {
                    biography_id: bioId,
                    user_id: userId,
                    name_bio: title
                },
                back_urls: {
                    success: back_urls.success,
                    failure: back_urls.failure
                }
            }
        })
    redirect(preference.sandbox_init_point!)
} 