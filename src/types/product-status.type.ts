export enum ProductStatus {
  Available = 'Available', // Disponible para la compra
  Pending = 'Pending', // Pendiente, posiblemente recién agregado y en espera de aprobación
  Sold = 'Sold', // Vendido a un comprador
  Archived = 'Archived', // Archivado después de la venta o por otras razones
  Hidden = 'Hidden', // Oculto para todos excepto para el dueño (por ejemplo, para edición o por solicitud del usuario)
  Reserved = 'Reserved', // Reservado, posiblemente en un carrito de compras o en proceso de compra
  UnderReview = 'UnderReview', // En revisión, por ejemplo, si hay una disputa o un problema con el producto
}
