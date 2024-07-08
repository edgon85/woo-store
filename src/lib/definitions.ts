export enum OrderStatus {
  Initiated = 'Initiated',
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  Shipped = 'Shipped',
  OutForDelivery = 'OutForDelivery',
  Delivered = 'Delivered',
  Completed = 'Completed',
}

export type TypeCreateOrder = {
  productId: string;
  shippingAddressId: string;
  paymentMethod: number;
  amount: number;
  orderStatus?: string;
  packageDeliveryId: number;
  offerId?: string;
};

export type Summary = {
  delivery: number;
  deliveryOffer: number;
  deliveryTotal: number;
  productPrice: number;
  serviceFee: number;
  total: number;
};
