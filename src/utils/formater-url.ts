export function getPathUrl(url: string): string | null {
    // Decodificar la URL para manejar caracteres especiales como '%2F' que representan '/'
    const decodedUrl = decodeURIComponent(url);

    // Buscar la cadena después de '/o/' y antes de '?alt='
    const inicio = decodedUrl.indexOf('/o/') + 3; // Sumar 3 para omitir '/o/'
    const fin = decodedUrl.indexOf('?alt=');

    if (inicio !== -1 && fin !== -1) {
        return decodedUrl.substring(inicio, fin);
    } else {
        return null;
    }
}