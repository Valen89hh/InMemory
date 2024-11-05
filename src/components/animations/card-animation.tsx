import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface CardAnimationProps{
    className?: string
}

const CardAnimation: React.FC<CardAnimationProps> = ({
    className
}) => {
    return ( 
        <motion.div
            className={twMerge("bg-gray-100 rounded-ms animate-pulse h-full w-full", className)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}

        >

        </motion.div>
     );
}
 
export default CardAnimation;