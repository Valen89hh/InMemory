import { HTMLAttributes} from "react";
import { twMerge } from "tailwind-merge";

interface CardProps extends HTMLAttributes<HTMLElement>{
    children: React.ReactNode
}

const Card: React.FC<CardProps> = ({
    children,
    className,
    ...props
}) => {
    return ( 
        <article className={twMerge("rounded-md bg-white shadow-md p-4", className)} {...props}>
            {children}
        </article>
     );
}
 
export default Card;