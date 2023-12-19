import { IPackageDelivery } from '@/lib';
import { IUser } from './user';

export interface IProduct {
  id?: string;
  title: string;
  slug?: string;
  description: string;
  subcategory: ISubcategory;
  category?: ICategory;
  price: number;
  images: string[];
  isFeatured?: boolean;
  status: string;
  colors: number[];
  packageDelivery: number[];
  brand: IBrand;
  measurement: IMeasurement;
  clothesState: IClothesState;

  user?: IUser;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategory {
  id: string;
  title: string;
  slug: string;
}

export interface ISubcategory {
  id: string;
  title: string;
  slug?: string;
  // category?: ICategory;
}

export interface IBrand {
  id: number;
  title: string;
  slug: string;
}

export interface IMeasurement {
  id: number;
  slug: string;
  size: string;
  us?: number;
  eu?: number;
  uk?: number;
  waist?: string;
  long?: string;
  gender?: string;
  clothesType?: string;
}

export interface IClothesState {
  id: number;
  title: string;
  subtitle?: string;
  slug: string;
}

export interface IColor {
  id: number;
  slug: string;
  name: string;
  codeColor: string;
}

export interface ISubcategoryWithCategory extends ISubcategory {
  category: ICategory;
}
