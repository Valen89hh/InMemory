import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonPrimaryProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode
}


const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
    className,
    children, 
    ...props
}) => {
    return ( <button className={twMerge("py-2 px-4 text-white bg-primary border-primary border-2", className)} {...props}>
        {children}
    </button> );    
}
 
export default ButtonPrimary;