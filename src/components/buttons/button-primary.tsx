import { CircularProgress } from "@mui/material";
import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonPrimaryProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children?: React.ReactNode
    isLoading?: boolean
}


const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
    className,
    children, 
    isLoading,
    ...props
}) => {
    return ( <button className={twMerge("py-2 px-4 transition-all hover:bg-[#005377] hover:border-[#005377]  rounded-ms text-white bg-primary border-primary border-2 flex justify-center items-center gap-2", className)} {...props}>
        {isLoading && (
            <CircularProgress size={16} color="inherit"/>
        )}
        {children}
    </button> );    
}
 
export default ButtonPrimary;