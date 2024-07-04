export interface IOffer {
  id: string;
  price: number;
  status: string;
  createdAt: Date;
  acceptedAt: null;
  rejectedAt: null;
  counterOfferedAt: null;
  product: Product;
  buyer: Buyer;
}

interface Buyer {
  id: string;
  username: string;
  email: string;
}

interface Product {
  id: string;
  slug: string;
  title: string;
  price: number;
  status: string;
}
