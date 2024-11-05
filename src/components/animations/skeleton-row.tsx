"use client";

import { motion } from 'framer-motion';

interface SkeletonRowProps {
  columns: number; // Número de columnas a mostrar
}

export const SkeletonRow: React.FC<SkeletonRowProps> = ({ columns }) => {
  // Creamos un array con el número de columnas deseado
  const skeletonColumns = Array.from({ length: columns });

  return (
    <motion.tr
      className="animate-pulse"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {skeletonColumns.map((_, index) => (
        <td key={index} className="p-4">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
        </td>
      ))}
    </motion.tr>
  );
};
