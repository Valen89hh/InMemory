import { useProfileState } from "@/lib/storage/auth-storage"
import { createClient } from "@/lib/supabase/client"
import { OrdersForTable } from "@/lib/supabase/models"
import { useEffect, useState, useTransition } from "react"
import { getOrderForTableByUser } from "../actions"
import toast from "react-hot-toast"
import useOrderStore from "@/features/badge-alert/storage/use-order-store"

export function useOrdersForUser(){
    const supabase = createClient()
    const {profile} = useProfileState()
    const [orders, setOrders] = useState<OrdersForTable[]>([])
    const [loadingOrders, startLoadingOrders] = useTransition()
    const {markOrdersAsSeen} = useOrderStore()

    useEffect(()=>{
        startLoadingOrders(async()=>{
            const result = await getOrderForTableByUser()
            if(result.success) setOrders(result.data)
            else toast.error(result.error)
            markOrdersAsSeen()
        })
    }, [])

    useEffect(() => {
        const channel = supabase
          .channel('orders-channel-update') // Nombre del canal, puedes cambiarlo a lo que prefieras
          .on(
            'postgres_changes',
            { event: 'UPDATE', schema: 'public', table: 'orders' },
            (payload) => {
                const newOrder = payload.new;
                // Verificar si el `user_id` de la nueva orden coincide con el `user_id` del usuario autenticado
                if (newOrder.user_id === profile?.id) {
                  setOrders(prev=>prev.map(order=>order.id == newOrder.id ? {...order, status: newOrder.status} : order))
                }
            }
          )
          .subscribe();
    
        return () => {
          supabase.removeChannel(channel);
        };
    }, [profile]);


    return {
        orders,
        loadingOrders
    }
}