export const formatPhoneNumber = (value: string): string => {
    // Remover todo lo que no sea dígito
    const cleaned = value.replace(/\D/g, '');
    
    // Limitar el número a 12 dígitos (sin incluir el código de país)
    const match = cleaned.match(/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,3})$/);

    if (match) {
    return `+51 ${match[2]} ${match[3]} ${match[4]}`.trim();
    }

    return value;
};