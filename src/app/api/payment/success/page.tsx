import ButtonPrimary from "@/components/buttons/button-primary";
import Link from "next/link";

const PaymentSuccessPage = () => {
    return ( 
        <div className="h-screen space-y-3 w-screen flex flex-col justify-center items-center">
            <h1 className="text-4xl text-green-500">✅ Pago exitoso </h1>
            <Link href={"/dashboard/biographies"}>
                <ButtonPrimary>Volver</ButtonPrimary>
            </Link>
        </div>
     );
}
 
export default PaymentSuccessPage;