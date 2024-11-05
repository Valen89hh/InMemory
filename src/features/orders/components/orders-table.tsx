import { OrdersForTable } from "@/lib/supabase/models";
import Image from "next/image";
import OrderStatusBag from "./order-status";

const OrdersTable = ({orders}: {orders: OrdersForTable[]}) => {
    return (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">ID</th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">Biografía</th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">Total</th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">Fecha</th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-800">{order.id}</td>
                  <td className="px-4 py-2 text-gray-800">
                    <div className="flex gap-1">
                        <Image
                            src={order.photoBiography}
                            alt={order.nameBiography}
                            width={4000}
                            height={4000}
                            className="h-10 w-10 rounded-ms object-cover"
                        />
                        <h2>{order.nameBiography}</h2>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-gray-800">${order.total_cost}</td>
                  <td className="px-4 py-2 text-gray-800">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-2 text-gray-800">
                    <OrderStatusBag orderStatus={order.status}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    );
}
 
export default OrdersTable;