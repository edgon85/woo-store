export interface Balance {
  orders: Order[];
  balance: number;
}

export interface Order {
  id: string;
  amount: number;
  orderStatus: string;
  notes: null | string;
  guideUrl: string;
  paid: boolean;
  orderDate: Date;
  orderDateUpdated: Date;
  summary: Summary;
  product: Product;
}

export interface Product {
  title: string;
  price: number;
}

export interface Summary {
  delivery: number;
  deliveryOffer: number;
  deliveryTotal: number;
  productPrice: number;
  serviceFee: number;
  serviceFeeSeller: number;
  total: number;
}
