import Image from "next/image";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonFacebookProps extends HTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode
}


const ButtonFacebook: React.FC<ButtonFacebookProps> = ({
    children,
    className,
    ...props
}) => {
    return ( 
        <button className={twMerge("bg-gray-light text-sm text-gray-dark py-2 px-6 flex gap-2 justify-center items-center rounded-md",className)} {...props}>
            <Image
                alt="facebook"
                src={"/icons/facebook.png"}
                width={30}
                height={30}
            />

            {children}
        </button>
     );
}
 
export default ButtonFacebook;