export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'es-GT'
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export function formatDateChat(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();

  // Comprobar si la fecha proporcionada es 'hoy'.
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  // Obtener la hora en formato local 24h sin segundos.
  const timeString = date.toLocaleTimeString('es', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  if (isToday) {
    // Si es 'hoy', devolver solo la hora precedida por "hoy".
    return `hoy | ${timeString}`;
  } else {
    // Si no es 'hoy', obtener la fecha en formato local '12 jun 2024'.
    const dateStringFormatted = date.toLocaleDateString('es', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    // Combinar ambos con un separador.
    return `${timeString} | ${dateStringFormatted}`;
  }
}
