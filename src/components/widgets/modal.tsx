"use client"

import useNoScroll from "@/hooks/use-not-scroll";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface ModalProps{
    children?: React.ReactNode,
    isOpen?: boolean,
    className?: string
}

const Modal: React.FC<ModalProps> = ({
    children,
    isOpen = false,
    className
}) => {

    useNoScroll(isOpen)

    return ( 
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                        key={"modal"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={twMerge("fixed overflow-hidden h-screen inset-0 bg-black bg-opacity-20 z-40", className)}
                    >
                        {children}
                </motion.div>
            )}
        </AnimatePresence>
     );
}
 
export default Modal;