"use client"
import { QRCodeCanvas } from "qrcode.react";

interface BiographyQrGeneratorProps{
    value: string; 
    size?: number;
    bgColor?: string; 
    fgColor?: string;
}

const BiographyQrGenerator: React.FC<BiographyQrGeneratorProps> = ({
    value,
    size = 250,
    bgColor = "#ffffff",
    fgColor = "#000000",
}) => {
    
    return ( <QRCodeCanvas
        value={value}
        size={size}
        bgColor={bgColor}
        fgColor={fgColor}
        style={{height: 120, width: 120}}
        className="rotate-45"
        level="L" // Nivel de corrección de errores (L, M, Q, H)
      />);
}
 
export default BiographyQrGenerator;