import { StatusPayment } from '@/lib/models/biography-model';
import React from 'react';


interface StatusBiographyProps {
  status: StatusPayment;
}

const statusStyles: { [key in StatusPayment]: { bgColor: string; textColor: string; label: string } } = {
  pagado: { bgColor: "bg-green-600", textColor: "text-white", label: "Pagado" },
  enviando: { bgColor: "bg-yellow-600", textColor: "text-white", label: "Enviando" },
  enviado: { bgColor: "bg-blue-600", textColor: "text-white", label: "Enviado" },
  generando: { bgColor: "bg-sky-700", textColor: "text-white", label: "Generando" },
};

const StatusBiography: React.FC<StatusBiographyProps> = ({ status }) => {
  const { bgColor, textColor, label } = statusStyles[status];

  return (
    <span className={`px-2 py-1 rounded-xl text-sm ${bgColor} ${textColor}`}>
      {label}
    </span>
  );
};

export default StatusBiography;
