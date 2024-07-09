import { ProductStatus } from '@/enums';

export const InitialsProfile = (name: string): string => {
  return name
    .split(' ')
    .map((palabra) => palabra.charAt(0))
    .join('')
    .toUpperCase();
};

export const translateProductStatus = (status: string): string => {
  switch (status) {
    case ProductStatus.Available:
      return 'Disponible';
    case ProductStatus.Pending:
      return 'Pendiente';
    case ProductStatus.Sold:
      return 'Vendido';
    case ProductStatus.Archived:
      return 'Archivado';
    case ProductStatus.Hidden:
      return 'Oculto';
    case ProductStatus.Reserved:
      return 'Reservado';
    case ProductStatus.UnderReview:
      return 'Bajo revisión';
    case ProductStatus.PendingPayment:
      return 'Pendiente de pago';
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
