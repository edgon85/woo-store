export interface IProduct {
  _id?: string;
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  color: IColor[];
  description: string;
  gender: string;
  brand: number;
  price: number;
  size: number;
  state: number;
  type: string;
  user: string;
  images: string[];
  isFeatured?: boolean;
  available: boolean;
  creationAt?: string;
  updatedAt?: string;
}

export interface ICategory {
  id: string;
  title: string;
  type: string;
}

export interface ISubcategory {
  id: string;
  title: string;
}

export interface IBrand {
  id: number;
  title: string;
  slug: string;
}

export interface IClotesSize {
  id: number;
  size: string;
  us?: number;
  eu?: number;
  uk?: number;
  waist?: string;
  long?: string;
}

export interface IClothesState {
  id: number;
  title: string;
  subtitle?: string;
}

export interface IColor {
  id: number;
  name: string;
  codeColor: string;
}

/* 
export interface IProduct {
  _id?: string;
  title: string;
  price: number;
  discount: number;
  images: string[];
  id: string;
  slug: string;
  category: number;
  subCategory: number;
  inStock: number;
  type: string;
  tags: string[];
  description: string;
  isFeatured?: boolean;
  available: boolean;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}
*/
