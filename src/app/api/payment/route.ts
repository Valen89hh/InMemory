import { createPayment, getBiographyById, updateBiographyPayment } from "@/lib/firebase";
import { mercadopago } from "@/lib/mercado-pago";
import { Timestamp } from "firebase/firestore";
import { Payment } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try{

        const body = await request.json()
        const payment = await new Payment(mercadopago).get({id: body.data.id})
        console.log("Hola")
        if(payment.status == "approved"){
            const res = await updateBiographyPayment(payment.metadata.biography_id, "pagado")
            console.log("Payment", payment)
            const payRes = await createPayment({
                id: "",
                name: payment.metadata.name_bio,
                amount: payment.transaction_details?.total_paid_amount ?? 0,
                createAt: new Date(),
                userId: payment.metadata.user_id,
                bioId: payment.metadata.biography_id,
                status: "pagado",
                codigo: ""
            })
            console.log(payRes)
            return NextResponse.json({success: true,message: "Payment approved"} )
        }else{
            return NextResponse.json({success: false, message: `Payment not approved. Status: ${payment.status}`})
        }
        
    }catch(err){
        console.log(err)
        return NextResponse.json({ success: false, message: 'Error processing payment' });
    }
}