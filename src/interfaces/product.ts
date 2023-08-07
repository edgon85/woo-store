import { IUser } from './user';

export interface IProduct {
  _id?: string;
  title: string;
  slug?: string;
  category: ICategory;
  subcategory: ISubcategory;
  color: IColor[];
  description: string;
  gender: string;
  brand: IBrand;
  price: number;
  size: number;
  state: IClothesState;
  type: string;
  user: IUser;
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
  slug: string;
  size: string;
  us?: number;
  eu?: number;
  uk?: number;
  waist?: string;
  long?: string;
  gender?: string;
  type?: string;
}

export interface IClothesState {
  id: number;
  title: string;
  subtitle?: string;
}

export interface IColor {
  id: string;
  name: string;
  codeColor: string;
}
