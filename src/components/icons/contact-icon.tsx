import { twMerge } from "tailwind-merge";
import { IconProps } from "./icons-props";

const ContactIcon: React.FC<IconProps> = ({
    color = "#fff",
    width = 32,
    height = 32,
    onClick,
    className
}) => {
    return ( 
        <svg className={twMerge("", className)} onClick={onClick} width={width} height={height} viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0H2C0.9 0 0 0.9 0 2V18C0 19.1 0.9 20 2 20H14C15.1 20 16 19.1 16 18V6L10 0ZM8 8C9.1 8 10 8.9 10 10C10 11.1 9.1 12 8 12C6.9 12 6 11.1 6 10C6 8.9 6.9 8 8 8ZM12 16H4V15.43C4 14.62 4.48 13.9 5.22 13.58C6.07 13.21 7.01 13 8 13C8.99 13 9.93 13.21 10.78 13.58C11.52 13.9 12 14.62 12 15.43V16Z" fill={color}/>
        </svg>
     );
}
 
export default ContactIcon;