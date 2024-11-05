"use client"

import { CalendarDays } from "lucide-react";
import React, { InputHTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";
import dayjs, { Dayjs } from 'dayjs';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

dayjs.locale('es'); // Configura dayjs para usar el español


interface FieldDateProps extends InputHTMLAttributes<HTMLInputElement>{
  error?: string | null,
  label?: string,
  onChangeDate?: (date: Dayjs | null) => void;
  valueDate?: Dayjs | null,
  classNameContainer?: string
}

const FieldDate: React.FC<FieldDateProps> = ({
  className,
  classNameContainer,
  error,
  label,
  onChangeDate,
  valueDate = null,
  ...props
}) => {
    const [isFocus, setIsFocus] = useState(false)
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const refDiv = useOutsideClick<HTMLDivElement>(() => {
        setIsCalendarOpen(false)
        setIsFocus(false)
    }); // Cierra el calendario al hacer clic fuera

    const handleDateChange = (date: Dayjs | null) => {
        if(onChangeDate) onChangeDate(date)
        setIsFocus(false)
        setIsCalendarOpen(false); // Cierra el calendario después de seleccionar la fecha
    };

    const handleContainerClick = () => {
        setIsFocus(true);
        setIsCalendarOpen(true); // Abre el calendario al hacer clic en el contenedor
    };

    return (
        <div onClick={handleContainerClick} ref={refDiv} className="relative w-full">
            {label && (
                <label className={`font-medium ${error ? "text-red-500" : "text-primary"} text-lg`} htmlFor={props.id}>
                    {label}
                </label>
            )}
            <div className={twMerge(`border-solid transition-all flex items-center  gap-2 min-w-[10rem] ${label && "mt-1"} bg-background px-4 py-2 rounded-ms border-2
                ${error ? "border-red-500" : isFocus ? "border-primary" : "border-slate-e"}`, classNameContainer)}>
                <input 
                    readOnly
                    className={twMerge("outline-none bg-transparent w-full border-none text-black", className)} 
                    {...props} 
                    value={valueDate ?  valueDate.format('MMM D, YYYY') : ""}
                    onFocus={()=>setIsFocus(true)}
                />
                <CalendarDays size={18}/>
            </div>
            {error && (<span className="text-red-500 text-sm" >{error}</span>)}
            {isCalendarOpen && (
                <div 
                    className="absolute z-10 mt-2 rounded-ms bg-white shadow-md border-2 border-primary" 
                    onClick={(e) => e.stopPropagation()} // Evita que el clic en el calendario lo cierre
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem>
                            <DateCalendar value={valueDate} onChange={(newValue) => {
                                handleDateChange(newValue)
                            }} />
                        </DemoItem>
                    </LocalizationProvider>
                </div>
            )}
        </div>
    );
}


FieldDate.displayName = "FieldDate";

export default FieldDate;
