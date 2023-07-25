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
  id: string;
  name: string;
  slug: string;
}

export interface IClotesSize {
  id: string;
  size: string;
  us?: number;
  eu?: number;
  uk?: number;
  waist?: string;
  long?: string;
}

export interface IClothesState { 
  id: string,
  title: string;
  subtitle?: string;
}
