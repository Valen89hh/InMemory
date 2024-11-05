import Container from "@/components/containers/container";
import { usePriceState } from "../storage/price-storage";
import Logo from "@/components/logo";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ShoppingCart } from "lucide-react";
import { ResumenCheckout } from "./resumen-cart";
import { useState } from "react";

export const ShowReumenCheckout = () => {
    const {totalPrice} = usePriceState()
    const [show, setShow] = useState(false)
    return ( 
        <div className="block lg:hidden">
            <Container className="p-6 md:w-[80%]">
                <Logo/>
            </Container>
            <AnimatePresence>
                <section className="bg-white">
                    <div className="cursor-pointer py-3" onClick={()=>setShow(!show)}>
                        <Container className="flex px-6 md:w-[80%] justify-between items-center">
                            <button className="text-primary flex items-center gap-2">
                                <ShoppingCart size={16}/>
                                <h3>{show ? "Ocultar" : "Mostrar"} resumen del pedido</h3>
                                <motion.span
                                    initial={{rotate: 0}}
                                    animate={{rotate: show ? -180 : 0}}
                                >
                                    <ChevronDown size={16}/>
                                </motion.span>
                            </button>

                            <h2 className="text-xl hidden xs:block text-secondary-text font-bold">S/ {totalPrice}</h2>
                        </Container>
                    </div>
                    <motion.div
                        className="bg-white overflow-hidden"
                        initial={{height: 0}}
                        animate={{height: show ? "auto" : 0}}
                    >
                        <Container className="px-6 md:w-[80%]">
                            <ResumenCheckout isSmall/>
                        </Container>
                    </motion.div>
                </section>
            </AnimatePresence>
        </div>
     );
}