import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonSecondaryProps extends HTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode
}


const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
    className,
    children, 
    ...props
}) => {
    return ( <button className={twMerge("py-2 px-4 text-primary bg-white border-white border-2", className)} {...props}>
        {children}
    </button> );    
}
 
export default ButtonSecondary;