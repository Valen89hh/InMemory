import { useEffect } from 'react';
import useOrderStore from '../storage/use-order-store';
import { createClient } from '@/lib/supabase/client';
import { useProfileState } from '@/lib/storage/auth-storage';


const useRealTimeOrders = () => {
    const supabase = createClient()
    const {profile} = useProfileState()
    const incrementOrderCount = useOrderStore((state) => state.incrementOrderCount);

    useEffect(() => {
        const channel = supabase
          .channel('orders-channel') // Nombre del canal, puedes cambiarlo a lo que prefieras
          .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'orders' },
            (payload) => {
                console.log(payload)
                const newOrder = payload.new;
                // Verificar si el `user_id` de la nueva orden coincide con el `user_id` del usuario autenticado
                if (newOrder.user_id === profile?.id) {
                  incrementOrderCount();
                }
            }
          )
          .subscribe();
    
        return () => {
          supabase.removeChannel(channel);
        };
    }, [incrementOrderCount, profile]);
}

export default useRealTimeOrders;
