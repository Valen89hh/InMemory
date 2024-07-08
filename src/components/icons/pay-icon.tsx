import { twMerge } from "tailwind-merge";
import { IconProps } from "./icons-props";

const PayIcon: React.FC<IconProps> = ({
    color = "#fff",
    width = 32,
    height = 32,
    onClick,
    className
}) => {
    return ( 
        <svg onClick={onClick} className={twMerge("", className)} width={width} height={height} viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.5 0.5H2.5C1.25125 0.5 0.26125 1.50125 0.26125 2.75L0.25 16.25C0.25 17.4988 1.25125 18.5 2.5 18.5H20.5C21.7488 18.5 22.75 17.4988 22.75 16.25V2.75C22.75 1.50125 21.7488 0.5 20.5 0.5ZM20.5 16.25H2.5V9.5H20.5V16.25ZM20.5 5H2.5V2.75H20.5V5Z" fill={color}/>
        </svg>

     );
}
 
export default PayIcon;