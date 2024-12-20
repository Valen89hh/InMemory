import { twMerge } from "tailwind-merge";

interface ContainerProps{
    children: React.ReactNode,
    className?: string
}

const Container: React.FC<ContainerProps> = ({
    children,
    className
}) => {
    return ( 
        <div className={twMerge("container mx-auto px-4 sm:px-6 lg:px-8", className)}>
            {children}
        </div>
     );
}
 
export default Container;