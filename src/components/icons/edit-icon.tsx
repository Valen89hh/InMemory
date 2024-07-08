import { twMerge } from "tailwind-merge";
import { IconProps } from "./icons-props";

const EditIcon: React.FC<IconProps> = ({
    color = "#fff",
    width = 32,
    height = 32,
    onClick,
    className
}) => {
    return ( 
        <svg onClick={onClick} className={twMerge("", className)} width={width} height={height} viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 33V18.86L21.86 5H4C1.8 5 0 6.8 0 9V37C0 39.2 1.8 41 4 41H32C34.2 41 36 39.2 36 37V19.14L22.14 33H8Z" fill={color}/>
            <path d="M12 29H20.48L34.88 14.6L26.4 6.12L12 20.52V29Z" fill={color}/>
            <path d="M39.8202 3.97999L37.0002 1.15999C35.4402 -0.40001 32.9002 -0.40001 31.3402 1.15999L29.2202 3.27999L37.7002 11.76L39.8202 9.63999C41.4002 8.07999 41.4002 5.53999 39.8202 3.97999Z" fill={color}/>
        </svg>
     );
}
 
export default EditIcon;