"use client"
import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";
import { useStateTabCheckout } from "../storage/tab-checkout-storage";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

interface TabSliderCheckoutProps {
    children: ReactNode[];
}

export const TabSliderCheckout = ({ children }: TabSliderCheckoutProps) => {
    const {activeTab, setActiveTab} = useStateTabCheckout()

    return (
        <div className=" h-full container mx-auto md:container-none md:w-[80%] w-[100%] p-6">
            <div className="flex font-medium items-center gap-1 text-sm">
                <Link href={"/dashboard/biographies"} className="text-primary">
                    Dashboard
                </Link>
                <ChevronRight className="text-gris" size={16}/>
                <button disabled={activeTab<0} onClick={()=>setActiveTab(0)} className={`${(activeTab > 0) ? "text-primary" : `${activeTab === 0 ? "text-slate-black" : "cursor-not-allowed text-gray-dark"}`}`}>
                    Informaci&oacute;n
                </button>
                <ChevronRight className="text-gris" size={16}/>
                <button disabled={activeTab<1} onClick={()=>setActiveTab(1)} className={`${(activeTab > 1) ? "text-primary" : `${activeTab === 1 ? "text-slate-black" : "cursor-not-allowed text-gray-dark"}`}`}>
                    Env&iacute;os
                </button>
                <ChevronRight className="text-gris" size={16}/>
                <button disabled={activeTab<2} onClick={()=>setActiveTab(2)} className={`${(activeTab > 2) ? "text-primary" : `${activeTab === 2 ? "text-slate-black" : "cursor-not-allowed text-gray-dark"}`}`}>
                    Pago
                </button>
            </div>
            <div className="w-full h-fit overscroll-y-none ">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                    >
                        {children[activeTab]}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}