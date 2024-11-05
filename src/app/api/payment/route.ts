import { mercadopago } from "@/lib/mercado-pago";
import { createClient } from "@/lib/supabase/server";
import { Payment } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Obtiene la clave secreta del entorno
const SECRET_KEY = process.env.MP_SECRET_KEY || "";

export async function POST(request: NextRequest) {
    try {
        const headers = request.headers;

        // Obtén los valores de x-signature y x-request-id
        const xSignature = headers.get("x-signature");
        const xRequestId = headers.get("x-request-id");

        if (!xSignature || !xRequestId) {
            console.warn("Missing x-signature or x-request-id headers.");
            return NextResponse.json({ success: false, message: "Unauthorized request" }, { status: 401 });
        }

        // Obtén dataID del cuerpo de la solicitud (puedes ajustar según tu lógica)
        const body = await request.json();
        const dataID = body.data.id;

        // Divide x-signature en sus partes
        const parts = xSignature.split(",");
        let ts, hash;

        // Extrae `ts` y `v1` de `x-signature`
        parts.forEach(part => {
            const [key, value] = part.split("=");
            if (key && value) {
                if (key.trim() === "ts") {
                    ts = value.trim();
                } else if (key.trim() === "v1") {
                    hash = value.trim();
                }
            }
        });

        if (!ts || !hash) {
            console.warn("Invalid x-signature format.");
            return NextResponse.json({ success: false, message: "Unauthorized request" }, { status: 401 });
        }

        // Genera el `manifest` y la firma HMAC
        const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;
        const hmac = crypto.createHmac("sha256", SECRET_KEY);
        hmac.update(manifest);
        const sha = hmac.digest("hex");

        // Verifica la firma
        if (sha !== hash) {
            console.warn("HMAC verification failed.");
            return NextResponse.json({ success: false, message: "Unauthorized request" }, { status: 401 });
        }

        // Una vez verificado, ejecuta la lógica del pago
        const supabase = createClient();
        const payment = await new Payment(mercadopago).get({ id: dataID });

        if (!payment || !payment.metadata) {
            throw new Error("Payment metadata not found.");
        }
        
        const idBio = payment.metadata.id_biograhy as string;
        const idOrder = payment.metadata.id_order as number;

        if (payment.status === "approved" && idBio && idOrder) {
            console.log("Payment approved");

            const { error: errorBio } = await supabase
                .from("biographies")
                .update({ status: "publico" })
                .eq("id", idBio);

            if (errorBio) {
                console.error("Error updating biography:", errorBio.message);
                return NextResponse.json({ success: false, message: "Failed to update biography" });
            }

            const { error: errorOrder } = await supabase
                .from("orders")
                .update({ status: "pagado" })
                .eq("id", idOrder);

            if (errorOrder) {
                console.error("Error updating order:", errorOrder.message);
                return NextResponse.json({ success: false, message: "Failed to update order" });
            }

            return NextResponse.json({ success: true, message: "Payment approved" });
        } else {
            console.warn("Payment not approved:", payment.status);

            const { error: errorOrder } = await supabase
                .from("orders")
                .update({ status: "fallido" })
                .eq("id", idOrder);

            if (errorOrder) {
                console.error("Error updating failed order:", errorOrder.message);
            }

            return NextResponse.json({
                success: false,
                message: `Payment not approved. Status: ${payment.status}`
            });
        }
    } catch (err) {
        console.error("Error processing payment:", err);
        return NextResponse.json({ success: false, message: "Error processing payment" });
    }
}
