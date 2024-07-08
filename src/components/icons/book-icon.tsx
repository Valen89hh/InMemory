import { twMerge } from "tailwind-merge";
import { IconProps } from "./icons-props";

const BookIcon: React.FC<IconProps> = ({
    color = "#fff",
    width = 32,
    height = 32,
    onClick,
    className
}) => {
    return ( 
        <svg onClick={onClick} className={twMerge("", className)} width={width} height={height} viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.375 19.25L20.625 20.375V2.375C20.625 1.1375 19.6125 0.125 18.375 0.125H7.11375C5.87625 0.125 4.875 1.1375 4.875 2.375H16.125C17.3625 2.375 18.375 3.3875 18.375 4.625V19.25ZM13.875 4.625H2.625C1.3875 4.625 0.375 5.6375 0.375 6.875V24.875L8.25 21.5L16.125 24.875V6.875C16.125 5.6375 15.1125 4.625 13.875 4.625Z" fill={color}/>
        </svg>
     );
}
 
export default BookIcon;