export interface IShippingService {
  id: number;
  slug: string;
  name: string;
  regularPrice: number;
  discountedPrice: number;
  deliveryTime: string;
  logo: string;
  available: boolean;
  finalPrice: number;
}
