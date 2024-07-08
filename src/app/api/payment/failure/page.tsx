import ButtonPrimary from "@/components/buttons/button-primary";
import Link from "next/link";

const PaymentFailurePage = () => {
    return ( 
        <div className="h-screen space-y-3 w-screen flex flex-col justify-center items-center">
            <h1 className="text-4xl text-red-500">❌ No se pudo realizar el pago </h1>
            <Link href={"/dashboard/biographies"}>
                <ButtonPrimary>Volver</ButtonPrimary>
            </Link>
        </div>
     );
}
 
export default PaymentFailurePage;