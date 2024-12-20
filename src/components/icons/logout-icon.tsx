import { twMerge } from "tailwind-merge";
import { IconProps } from "./icons-props";

const LogoutIcon: React.FC<IconProps> = ({
    color = "#fff",
    width = 32,
    height = 32,
    onClick,
    className
}) => {
    return ( 
        <svg onClick={onClick} className={twMerge("", className)} width={width} height={height} viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3.11111L10.872 4.20778L12.936 6.22222H4.8V7.77778H12.936L10.872 9.78444L12 10.8889L16 7L12 3.11111ZM1.6 1.55556H8V0H1.6C0.72 0 0 0.7 0 1.55556V12.4444C0 13.3 0.72 14 1.6 14H8V12.4444H1.6V1.55556Z" fill={color}/>
        </svg>        
     );
}
 
export default LogoutIcon;