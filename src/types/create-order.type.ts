export type TypeCreateOrder = {
  productId: string;
  shippingAddressId: string;
  paymentMethod: number;
  amount: number;
  orderStatus?: string;
  shippingServiceSlug: string
  offerId?: string;
};
