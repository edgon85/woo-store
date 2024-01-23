export const InitialsProfile = (name: string): string => {
  return name
    .split(' ')
    .map((palabra) => palabra.charAt(0))
    .join('')
    .toUpperCase();
};

export const translateProductStatus = (status: string): string => {
  switch (status) {
    case 'Available':
      return 'Disponible';
    case 'Pending':
      return 'Pendiente';
    case 'Sold':
      return 'Vendido';
    case 'Archived':
      return 'Archivado';
    case 'Hidden':
      return 'Oculto';
    case 'Reserved':
      return 'Reservado';
    case 'UnderReview':
      return 'Bajo revisión';
    default:
      return status; // Si no se encuentra ninguna traducción, devuelve el estado original
  }
};

export const translateOrderStatus = (status: string): string => {
  switch (status) {
    case 'Initiated':
      return 'Iniciado';
    case 'Pending':
      return 'Pendiente';
    case 'Confirmed':
      return 'Confirmado';
    case 'Shipped':
      return 'Enviado';
    case 'Out for Delivery':
      return 'En camino';
    case 'Delivered':
      return 'Entregado';
    case 'Completed':
      return 'Completado';
    default:
      return status; // Si no se encuentra ninguna traducción, devuelve el estado original
  }
};
