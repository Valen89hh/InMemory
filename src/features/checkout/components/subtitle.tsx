import { twMerge } from "tailwind-merge";

export const Subtitle = ({children, className}:{children: React.ReactNode, className?: string}) => {
    return ( 
        <h2 className={twMerge("text-secondary-text font-bold text-xl", className)}>
            {children}
        </h2>
     );
}