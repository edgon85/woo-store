import { OrderStatus, ProductStatus } from '@/enums';

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
    case OrderStatus.OrderPlaced:
      return 'Iniciado';
    case OrderStatus.SellerNotified:
      return 'Notificado al vendedor';
    case OrderStatus.PreparingOrder:
      return 'Preparando para envió';
    case OrderStatus.InTransit:
      return 'En camino';
    case OrderStatus.DeliveredPendingPayment:
      return 'Pendiente de pago';
    case OrderStatus.Completed:
      return 'Completado';
    case OrderStatus.Cancelled:
      return 'Cancelado';
    case OrderStatus.Failed:
      return 'Fallido';
    case OrderStatus.Refunded:
      return 'Reembolsado';
    case OrderStatus.Returned:
      return 'Devuelto';
    default:
      return status; // Si no se encuentra ninguna traducción, devuelve el estado original
  }
};
