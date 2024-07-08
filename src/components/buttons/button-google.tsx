import Image from "next/image";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonGoogleProps extends HTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode
}


const ButtonGoogle: React.FC<ButtonGoogleProps> = ({
    children,
    className,
    ...props
}) => {
    return ( 
        <button className={twMerge("bg-gray-light text-sm text-gray-dark py-2 px-6 flex gap-2 justify-center items-center rounded-md",className)} {...props}>
            <Image
                alt="google"
                src={"/icons/google.png"}
                width={30}
                height={30}
            />

            {children}
        </button>
     );
}
 
export default ButtonGoogle;