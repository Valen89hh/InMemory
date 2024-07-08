import { twMerge } from "tailwind-merge";
import { IconProps } from "./icons-props";

const SettingIcon: React.FC<IconProps> = ({
    color = "#fff",
    width = 32,
    height = 32,
    onClick,
    className
}) => {
    return ( 
        <svg onClick={onClick} className={twMerge("", className)} width={width} height={height} viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.5325 12.5575C18.5775 12.2199 18.6 11.8712 18.6 11.5C18.6 11.14 18.5775 10.78 18.5213 10.4425L20.805 8.66495C21.0075 8.50745 21.0638 8.2037 20.94 7.9787L18.78 4.2437C18.645 3.9962 18.3638 3.91745 18.1163 3.9962L15.4275 5.0762C14.865 4.6487 14.2688 4.2887 13.605 4.0187L13.2 1.1612C13.155 0.891201 12.93 0.699951 12.66 0.699951H8.34C8.07 0.699951 7.85625 0.891201 7.81125 1.1612L7.40625 4.0187C6.7425 4.2887 6.135 4.65995 5.58375 5.0762L2.895 3.9962C2.6475 3.9062 2.36625 3.9962 2.23125 4.2437L0.0825014 7.9787C-0.0524986 8.21495 -0.00749876 8.50745 0.217501 8.66495L2.50125 10.4425C2.445 10.78 2.4 11.1512 2.4 11.5C2.4 11.8487 2.4225 12.2199 2.47875 12.5575L0.195001 14.335C-0.00749874 14.4925 -0.0637486 14.7962 0.0600014 15.0212L2.22 18.7562C2.355 19.0037 2.63625 19.0825 2.88375 19.0037L5.5725 17.9237C6.135 18.3512 6.73125 18.7112 7.395 18.9812L7.8 21.8387C7.85625 22.1087 8.07 22.3 8.34 22.3H12.66C12.93 22.3 13.155 22.1087 13.1888 21.8387L13.5938 18.9812C14.2575 18.7112 14.865 18.3512 15.4163 17.9237L18.105 19.0037C18.3525 19.0937 18.6338 19.0037 18.7688 18.7562L20.9288 15.0212C21.0638 14.7737 21.0075 14.4925 20.7938 14.335L18.5325 12.5575ZM10.5 15.55C8.2725 15.55 6.45 13.7275 6.45 11.5C6.45 9.27245 8.2725 7.44995 10.5 7.44995C12.7275 7.44995 14.55 9.27245 14.55 11.5C14.55 13.7275 12.7275 15.55 10.5 15.55Z" fill={color}/>
        </svg>
     );
}
 
export default SettingIcon;