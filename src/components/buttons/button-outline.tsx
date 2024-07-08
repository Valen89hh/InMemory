import { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonOutlineProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode
}


const ButtonOutline: React.FC<ButtonOutlineProps> = ({
    className,
    children, 
    ...props
}) => {
    return ( <button className={twMerge("py-2 px-4 text-primary bg-transparent border-primary border-2", className)} {...props}>
        {children}
    </button> );    
}
 
export default ButtonOutline;