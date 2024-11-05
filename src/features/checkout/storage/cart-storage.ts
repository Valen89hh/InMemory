import { Biography, Product } from "@/lib/supabase/models";
import { create } from "zustand";

type ProductBiography = {
    biography: Biography,
    product: Product
}

interface CartState{
    productBiography: ProductBiography | null,
    setProductBiography: (bio: ProductBiography | null)=>void
}

export const useCartState = create<CartState>(set=>({
    productBiography: null,
    setProductBiography: (bio)=>set({productBiography: bio})
}))