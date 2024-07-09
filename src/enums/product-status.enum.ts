export enum ProductStatus {
  Available = 'available', // Disponible para la compra
  Pending = 'pending', // Pendiente, posiblemente recién agregado y en espera de aprobación
  Sold = 'sold', // Vendido a un comprador
  Archived = 'archived', // Archivado después de la venta o por otras razones
  Hidden = 'hidden', // Oculto para todos excepto para el dueño (por ejemplo, para edición o por solicitud del usuario)
  Reserved = 'reserved', // Reservado, posiblemente en un carrito de compras o en proceso de compra
  UnderReview = 'under_review', // En revisión, por ejemplo, si hay una disputa o un problema con el producto
  PendingPayment = 'pending_payment', // Pendiente de pago, por ejemplo, si el comprador no ha pagado
}
