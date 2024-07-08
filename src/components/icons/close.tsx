import { twMerge } from "tailwind-merge";
import { IconProps } from "./icons-props";

const Close: React.FC<IconProps> = ({
    color = "#fff",
    width = 32,
    height = 32,
    onClick,
    className
}) => {
    return ( 
        <svg className={twMerge("", className)} onClick={onClick} width={width} height={height} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.3333 1.645L14.6883 0L8.16667 6.52167L1.645 0L0 1.645L6.52167 8.16667L0 14.6883L1.645 16.3333L8.16667 9.81167L14.6883 16.3333L16.3333 14.6883L9.81167 8.16667L16.3333 1.645Z" fill={color}/>
        </svg>


     );
}
 
export default Close;