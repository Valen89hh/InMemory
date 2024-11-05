import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OrderStore {
  ordersCount: number;
  hasNewOrders: boolean;
  setOrdersCount: (count: number) => void;
  markOrdersAsSeen: () => void;
  incrementOrderCount: () => void;
}

const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      ordersCount: 0,
      hasNewOrders: false,
      setOrdersCount: (count) => set({ ordersCount: count }),
      markOrdersAsSeen: () => set({ hasNewOrders: false, ordersCount: 0 }),
      incrementOrderCount: () => set((state) => ({ ordersCount: state.ordersCount + 1, hasNewOrders: true })),
    }),
    {
      name: 'order-storage', // Nombre de clave para `localStorage`
    }
  )
);

export default useOrderStore;
