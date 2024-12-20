import { twMerge } from "tailwind-merge";
import { IconProps } from "./icons-props";

const Facebook: React.FC<IconProps> = ({
    color = "#fff",
    width = 32,
    height = 32,
    onClick,
    className
}) => {
    return ( 
        <svg className={twMerge("", className)} onClick={onClick} width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.3334 16.0001C29.3334 8.64008 23.3601 2.66675 16.0001 2.66675C8.64008 2.66675 2.66675 8.64008 2.66675 16.0001C2.66675 22.4534 7.25341 27.8267 13.3334 29.0667V20.0001H10.6667V16.0001H13.3334V12.6667C13.3334 10.0934 15.4267 8.00008 18.0001 8.00008H21.3334V12.0001H18.6667C17.9334 12.0001 17.3334 12.6001 17.3334 13.3334V16.0001H21.3334V20.0001H17.3334V29.2667C24.0667 28.6001 29.3334 22.9201 29.3334 16.0001Z" fill={color}/>
        </svg>
     );
}
 
export default Facebook;