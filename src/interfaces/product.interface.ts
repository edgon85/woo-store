import { IMunicipality, IUser } from './';

export interface IProduct {
  id?: string;
  title: string;
  slug?: string;
  description: string;
  subcategory: ISubcategory;
  category?: ICategory;
  price: number;
  fee?: number;
  images: string[];
  coverImage: string;
  isFeatured?: boolean;
  status: string;
  weight: number;
  isShippingIncluded: boolean;
  colors: IColor[];
  brand: IBrand;
  measurement: IMeasurement;
  clothesState: IClothesState;
  reservedFor?: ReservedFor;
  originMunicipality?: IMunicipality;

  user?: IUser;
  createdAt?: Date;
  updatedAt?: Date;

  offer?: {
    id: string;
    price: number;
    status: string;
    createdAt: string;
    acceptedAt: null;
    rejectedAt: null;
    counterOfferedAt: null;
  };
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
  id: string;
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

export interface ProductImage {
  id: number;
  url: string;
  productId: string;
}

interface ReservedFor {
  userId: string;
  fullName: string;
  username: string;
  acceptedAt: string;
}

export interface ISubcategoryWithCategory extends ISubcategory {
  category: ICategory;
}

export interface IProductWithOffer extends IProduct {
  offerPrice?: number;
  offerId?: string;
  offerStatus?: string;
}
