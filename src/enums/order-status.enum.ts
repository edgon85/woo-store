export enum OrderStatus {
  /** El comprador ha realizado la compra y se ha generado la orden en el sistema */
  OrderPlaced = 'order_placed',

  /** El vendedor ha sido notificado de la venta */
  SellerNotified = 'seller_notified',

  /** El vendedor está preparando el producto para enviarlo a paquetería */
  PreparingOrder = 'preparing_order',

  /** El producto ha sido entregado a la paquetería */
  InTransit = 'in_transit',

  /** El producto ha sido entregado al comprador y está pendiente de pago */
  DeliveredPendingPayment = 'delivered_pending_payment',

  /** El pago ha sido recibido y la orden se ha completado */
  Completed = 'completed',

  /** La orden ha sido cancelada (puede usarse en cualquier punto antes de la entrega) */
  Cancelled = 'cancelled',

  /** Hubo un problema con la entrega o el pago */
  Failed = 'failed',

  /** Se ha realizado un reembolso para este pedido */
  Refunded = 'refunded',

  /** El cliente ha devuelto el pedido */
  Returned = 'returned',
}
