export interface User {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    phone?: string | null;
    country?: string | null;
    state?: string | null; // Departamento
    province?: string | null;
    district?: string | null;
    address?: string | null;
    appellidoPaterno?: string | null;
    appellidoMaterno?: string | null;
    dni?: string | null;
    role: string
}