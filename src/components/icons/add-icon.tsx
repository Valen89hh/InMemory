import { twMerge } from "tailwind-merge";
import { IconProps } from "./icons-props";

const AddIcon: React.FC<IconProps> = ({
    color = "#fff",
    width = 32,
    height = 32,
    onClick,
    className
}) => {
    return ( 
        <svg onClick={onClick} className={twMerge("",className)} width={width} height={height} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 4.75H0.25V20.5C0.25 21.7375 1.2625 22.75 2.5 22.75H18.25V20.5H2.5V4.75ZM20.5 0.25H7C5.7625 0.25 4.75 1.2625 4.75 2.5V16C4.75 17.2375 5.7625 18.25 7 18.25H20.5C21.7375 18.25 22.75 17.2375 22.75 16V2.5C22.75 1.2625 21.7375 0.25 20.5 0.25ZM19.375 10.375H14.875V14.875H12.625V10.375H8.125V8.125H12.625V3.625H14.875V8.125H19.375V10.375Z" fill={color}/>
        </svg>


     );
}
 
export default AddIcon;