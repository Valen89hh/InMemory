import { useState } from "react";

type Field<T> = {
    value: T;
    error?: string | null;
};

type Fields<T> = {
    [K in keyof T]: Field<T[K]>;
};

export type Validators<T> = {
    // El validador ahora acepta el valor del campo y los valores de los otros campos
    [K in keyof T]: (value: T[K], allValues: T) => string | null;
};

export function useFormFields<T extends object>(initialState: T, validators: Validators<T>) {
    const [fields, setFields] = useState<Fields<T>>(
        Object.keys(initialState).reduce((acc, key) => {
            acc[key as keyof T] = { value: initialState[key as keyof T] };
            return acc;
        }, {} as Fields<T>)
    );

    // Manejar cambios en los inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        const fieldName = name as keyof T;

        // Convertir el valor según el tipo de input o el tipo de dato esperado en el formulario
        let parsedValue: T[typeof fieldName];

        if (type === "number") {
            parsedValue = (value === "" ? "" : parseFloat(value)) as T[typeof fieldName]; // Convertimos a número
        } else if (type === "checkbox") {
            parsedValue = (e.target as HTMLInputElement).checked as T[typeof fieldName]; // Convertimos a booleano
        } else {
            parsedValue = value as T[typeof fieldName]; // Para strings y otros tipos, dejamos el valor como está
        }

        // Obtener los valores actuales del formulario
        const currentValues = Object.keys(fields).reduce((acc, key) => {
            acc[key as keyof T] = fields[key as keyof T].value;
            return acc;
        }, {} as T);

        // Validar el valor usando el validador específico del campo, pasando los valores actuales
        const error = validators[fieldName](parsedValue, currentValues);

        setFields((prevFields) => ({
            ...prevFields,
            [fieldName]: { ...prevFields[fieldName], value: parsedValue, error },
        }));
    };

    const validate = () => {
        let isValid = true;
        const newFields = { ...fields };

        const currentValues = Object.keys(fields).reduce((acc, key) => {
            acc[key as keyof T] = fields[key as keyof T].value;
            return acc;
        }, {} as T);

        for (const key in fields) {
            if (fields.hasOwnProperty(key)) {
                const fieldName = key as keyof T;
                const value = fields[fieldName].value;

                const error = validators[fieldName](value, currentValues);

                if (error) {
                    isValid = false;
                }

                newFields[fieldName] = { value, error };
            }
        }

        setFields(newFields);
        return isValid;
    };

    const reset = (values: T) => {
      const resetValues = {...fields}
        Object.keys(fields).forEach((key) => {
            const fieldKey = key as keyof T;
            const value = values[fieldKey];
            resetValues[fieldKey] = {value}
        });
        setFields(resetValues)
    };

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>,
        onSubmit: (data: T) => void
    ) => {
        e.preventDefault();
        if (validate()) {
            const data = Object.keys(fields).reduce((acc, key) => {
                // Cast necesario para asegurarse que el tipo es el correcto
                acc[key as keyof T] = fields[key as keyof T].value as T[keyof T];
                return acc;
            }, {} as T);
            onSubmit(data);
        }
    };

    const handleValidateSubmit = (
        onSubmit: (data: T) => void
    ) => {
        if (validate()) {
            const data = Object.keys(fields).reduce((acc, key) => {
                // Cast necesario para asegurarse que el tipo es el correcto
                acc[key as keyof T] = fields[key as keyof T].value as T[keyof T];
                return acc;
            }, {} as T);
            onSubmit(data);
        }
    };

    // Actualiza el valor de un campo
    const setFieldValue = <K extends keyof T>(key: K, value: T[K]) => {
        const currentValues = Object.keys(fields).reduce((acc, key) => {
            acc[key as keyof T] = fields[key as keyof T].value;
            return acc;
        }, {} as T);

        const error = validators[key](value, currentValues);

        setFields((prevFields) => ({
            ...prevFields,
            [key]: { ...prevFields[key], value, error },
        }));
    };

    // Actualiza el error de un campo
    const setFieldError = <K extends keyof T>(key: K, error: string | null) => {
        setFields((prevFields) => ({
            ...prevFields,
            [key]: { ...prevFields[key], error },
        }));
    };

    return {
        fields,
        setFieldValue,
        setFieldError,
        reset,
        handleChange,
        handleSubmit,
        validate,
        handleValidateSubmit
    };
}
