export function capitalizeFirstLetter(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

export function joinBlanks(text: string): string{
  return text.split(" ").join("_")
}

export function extractTextFromHTMLString(htmlContent: string, maxLength: number = 150): string {
  const regex = /<p[^>]*>(.*?)<\/p>/gi;
  const matches = Array.from(htmlContent.matchAll(regex)); // Convertir iterador a array
  
  let description = '';

  for (const match of matches) {
    description += match[1].trim() + ' ';
    if (description.length >= maxLength) {
      description = description.slice(0, maxLength); // Limitar el número de caracteres
      break;
    }
  }

  return description.trim() + '...';
}

export function stringToUrlSlug(str: string): string {
  // Remover tildes y convertir ñ a n, convertir a lowercase
  const from = "ÁÀÄÂáàäâÉÈËÊéèëêÍÌÏÎíìïîÓÒÖÔóòöôÚÙÜÛúùüûÑñÇç";
  const to   = "AAAAaaaaEEEEeeeeIIIIiiiiOOOOooooUUUUuuuuNnCc";

  const newStr = str
    .split("")
    .map((char, i) => {
      const index = from.indexOf(char);
      return index !== -1 ? to[index] : char;
    })
    .join("");

  // Convertir a minúsculas, reemplazar espacios por guiones, remover caracteres no válidos
  return newStr
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")           // Reemplazar espacios por guiones
    .replace(/[^a-z0-9-]/g, "");    // Eliminar caracteres no alfanuméricos excepto guiones
}

export function fileNameToUrlSlug(str: string): string {
  // Extraer la última extensión del archivo, si existe
  const parts = str.split(".");
  const extension = parts.length > 1 ? `.${parts.pop()!.toLowerCase()}` : "";
  const baseName = parts.join(".");

  // Remover tildes y convertir ñ a n
  const from = "ÁÀÄÂáàäâÉÈËÊéèëêÍÌÏÎíìïîÓÒÖÔóòöôÚÙÜÛúùüûÑñÇç";
  const to = "AAAAaaaaEEEEeeeeIIIIiiiiOOOOooooUUUUuuuuNnCc";

  const newStr = baseName
    .split("")
    .map((char) => {
      const index = from.indexOf(char);
      return index !== -1 ? to[index] : char;
    })
    .join("");

  // Convertir a minúsculas, reemplazar espacios por guiones, remover caracteres no válidos
  return (
    newStr
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Reemplazar espacios por guiones
      .replace(/[^a-z0-9-]/g, "") + // Eliminar caracteres no alfanuméricos excepto guiones
    extension
  );
}

export function urlSlugToString(slug: string): string {
  // Reemplazar guiones por espacios
  const newStr = slug.replace(/-/g, " ");

  // Convertir la primera letra de cada palabra a mayúscula
  return newStr
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}