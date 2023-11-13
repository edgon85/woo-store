export interface IPaymentMethod {
  id: number;
  logo: string;
  name: string;
  label: string;
}

export interface IPackageDelivery {
  id: number;
  slug?: string;
  name: string;
  price: number;
  originalPrice: string;
  deliveryTime: string;
  logo: string;
  available: boolean;
}
