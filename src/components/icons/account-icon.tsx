import { twMerge } from "tailwind-merge";
import { IconProps } from "./icons-props";

const AccountIcon: React.FC<IconProps> = ({
    color = "#fff",
    width = 32,
    height = 32,
    onClick,
    className
}) => {
    return ( 
        <svg onClick={onClick} className={twMerge("", className)} width={width} height={height} viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.33333 7.00004C9.17428 7.00004 10.6667 5.50766 10.6667 3.66671C10.6667 1.82576 9.17428 0.333374 7.33333 0.333374C5.49238 0.333374 4 1.82576 4 3.66671C4 5.50766 5.49238 7.00004 7.33333 7.00004Z" fill={color}/>
            <path d="M7.89163 7.85004C7.70829 7.84171 7.52496 7.83337 7.33329 7.83337C5.31663 7.83337 3.43329 8.39171 1.82496 9.35004C1.09163 9.78337 0.666626 10.6 0.666626 11.4584V13.6667H8.38329C7.72496 12.725 7.33329 11.575 7.33329 10.3334C7.33329 9.44171 7.54163 8.60837 7.89163 7.85004Z" fill={color}/>
            <path d="M16.2916 10.3334C16.2916 10.1501 16.2666 9.98341 16.2416 9.80841L17.1916 8.96675L16.3583 7.52508L15.1499 7.93341C14.8833 7.70841 14.5833 7.53341 14.2499 7.40841L13.9999 6.16675H12.3333L12.0833 7.40841C11.7499 7.53341 11.4499 7.70841 11.1833 7.93341L9.97493 7.52508L9.1416 8.96675L10.0916 9.80841C10.0666 9.98341 10.0416 10.1501 10.0416 10.3334C10.0416 10.5167 10.0666 10.6834 10.0916 10.8584L9.1416 11.7001L9.97493 13.1417L11.1833 12.7334C11.4499 12.9584 11.7499 13.1334 12.0833 13.2584L12.3333 14.5001H13.9999L14.2499 13.2584C14.5833 13.1334 14.8833 12.9584 15.1499 12.7334L16.3583 13.1417L17.1916 11.7001L16.2416 10.8584C16.2666 10.6834 16.2916 10.5167 16.2916 10.3334ZM13.1666 12.0001C12.2499 12.0001 11.4999 11.2501 11.4999 10.3334C11.4999 9.41675 12.2499 8.66675 13.1666 8.66675C14.0833 8.66675 14.8333 9.41675 14.8333 10.3334C14.8333 11.2501 14.0833 12.0001 13.1666 12.0001Z" fill={color}/>
        </svg>
     );
}
 
export default AccountIcon;