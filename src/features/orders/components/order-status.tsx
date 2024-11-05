import { OrderStatus } from "@/lib/supabase/models";

const statusStyles: { [key in OrderStatus]: { label: string; color: string } } = {
    pendiente: { label: "Pendiente", color: "bg-yellow-200 text-yellow-800" },
    pagado: { label: "Pagado", color: "bg-blue-200 text-blue-800" },
    procesando: { label: "Procesando", color: "bg-indigo-200 text-indigo-800" },
    enviado: { label: "Enviado", color: "bg-purple-200 text-purple-800" },
    entregado: { label: "Entregado", color: "bg-green-200 text-green-800" },
    cancelado: { label: "Cancelado", color: "bg-red-200 text-red-800" },
    fallido: { label: "Fallido", color: "bg-gray-200 text-gray-800" },
    rembolsado: { label: "Reembolsado", color: "bg-teal-200 text-teal-800" },
  };

const OrderStatusBag = ({orderStatus}: {orderStatus: OrderStatus}) => {
    const { label, color } = statusStyles[orderStatus];

    return (
      <span className={`px-2 py-1 rounded-full text-sm font-semibold ${color}`}>
        {label}
      </span>
    );
}
 
export default OrderStatusBag;