import { twMerge } from "tailwind-merge";
import { IconProps } from "./icons-props";

const HomeIcon: React.FC<IconProps> = ({
    color = "#fff",
    width = 32,
    height = 32,
    onClick,
    className
}) => {
    return ( 
        <svg className={twMerge("", className)} onClick={onClick} width={width} height={height} viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.41683 17.8333V11.5833H12.5835V17.8333H17.7918V9.5H20.9168L10.5002 0.125L0.0834961 9.5H3.2085V17.8333H8.41683Z" fill={color}/>
        </svg>

     );
}
 
export default HomeIcon;