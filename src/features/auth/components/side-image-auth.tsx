"use client"
import Logo from "@/components/logo";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface SideImageAuthProps{
    image: string,
    alt: string
}

const SideImageAuth: React.FC<SideImageAuthProps> = ({
    image,
    alt
}) => {
    return ( 
        <div className="lg:w-1/2 overflow-hidden transition-all xl:w-[60%] hidden md:block relative max-h-screen">
            <Image
                alt={alt}
                src={image}
                width={766}
                height={902}
                priority
                className="w-full h-full object-cover"
            />
            <AnimatePresence>

                <motion.div initial={{opacity: 0}} animate={{opacity: 1}}>
                    <Logo className="absolute top-4 left-4" color="#fff"/>
                </motion.div>
            </AnimatePresence>
        </div>
     );
}
 
export default SideImageAuth;