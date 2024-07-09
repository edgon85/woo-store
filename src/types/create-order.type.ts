export type TypeCreateOrder = {
  productId: string;
  shippingAddressId: string;
  paymentMethod: number;
  amount: number;
  orderStatus?: string;
  packageDeliveryId: number;
  offerId?: string;
};
