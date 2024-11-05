"use client"

import { OrdersForTable } from "@/lib/supabase/models";
import { useEffect, useState, useTransition } from "react";
import { getOrderForTableByUser } from "../actions";
import toast from "react-hot-toast";
import Card from "@/components/cards/card";
import { SkeletonRow } from "@/components/animations/skeleton-row";
import OrdersTable from "./orders-table";
import { useOrdersForUser } from "../hooks/use-orders-for-user";

const OrdersForUser = () => {
    const {orders, loadingOrders} = useOrdersForUser()

    return ( 
        <Card>
            {loadingOrders ? (
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
                        {Array.from({length: 5}).map((_, i)=><SkeletonRow columns={5} key={i}/>)}
                    </tbody>
                </table>  
            ): orders.length > 0 ? (
                <OrdersTable orders={orders}/>
            ) : (
                <div className="h-[20rem] w-full flex justify-center items-center">
                    <p>Aún no has comprado ninguna biografía. Explora nuestras opciones y empieza a crear recuerdos para tus seres queridos.</p>
                </div>
            )}
        </Card>
     );
}
 
export default OrdersForUser;