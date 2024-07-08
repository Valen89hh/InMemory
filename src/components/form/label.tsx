import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface LabelProps extends HTMLAttributes<HTMLLabelElement>{

}

const Label: React.FC<LabelProps> = ({
    children,
    className,
    ...props
}) => {
    return ( 
        <label className={twMerge("text-primary text-[1.1rem]")} {...props}>
            {children}
        </label>
     );
}
 
export default Label;