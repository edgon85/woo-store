export interface IPackageDelivery {
  id: number;
  slug?: string;
  name: string;
  regularPrice: number;
  discountedPrice: number;
  deliveryTime: string;
  logo: string;
  available: boolean;
  finalPrice: number;
  isShippingIncluded: boolean;
}
