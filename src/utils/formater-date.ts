import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Importa el idioma español para obtener los nombres de los meses en español
import { format } from 'date-fns';

const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
]


dayjs.locale('es'); // Configura dayjs para usar el español

function formatDateSpanish(date: Date): string {
    return dayjs(date).format('MMM D, YYYY');
}

export function formatDataToString(date: Date){
    const month = meses[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()

    return `${month} ${day}, ${year}`
}

export function dateToString(date: Date){
    const month = date.getMonth()
    const day = date.getDate()
    const year = date.getFullYear()
    const strDate = `${year}-${month < 9 ? "0" : ""}${month+1}-${day < 10 ? "0" : ""}${day}`
    console.log(strDate)
    return strDate
}


export const formatDate = (date: Date) => {
  return format(date, "yyyy-MM-dd hh:mm aa");
};

