import { twMerge } from "tailwind-merge";
import { IconProps } from "./icons-props";

const Menu: React.FC<IconProps> = ({
    color = "#fff",
    width = 32,
    height = 32,
    onClick,
    className
}) => {
    return ( 
        <svg className={twMerge("", className)} onClick={onClick} width={width} height={height} viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 12H18V10H0V12ZM0 7H18V5H0V7ZM0 0V2H18V0H0Z" fill={color}/>
        </svg>

     );
}
 
export default Menu;