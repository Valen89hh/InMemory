export function isPhoneNumber(text: string){
    const regex = /^\+51\s(\d{3})\s(\d{3})\s(\d{3})+$/;
    return regex.test(text);
}
export function isNumber(text: string){
    const regex = /^\d+$/;
    return regex.test(text);
}

export function isValidEmail(email: string){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}