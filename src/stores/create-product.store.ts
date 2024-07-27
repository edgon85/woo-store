import {
  IBrand,
  ICategory,
  IClothesState,
  IColor,
  IMeasurement,
  ISubcategory,
} from '@/interfaces';
import { create } from 'zustand';

type CreateProductState = {
  gender: string;
  clothesType: string;
  category: ICategory | null;
  subcategory: ISubcategory | null;
  brand: IBrand | null;
  measurement: IMeasurement | null;
  clothesState: IClothesState | null;
  colors: IColor[] /* 
  price: number;
  weight: number; */;
  isShippingIncluded: boolean;

  setGender: (value: string) => void;
  setClothesType: (value: string) => void;
  setCategory: (category: ICategory) => void;
  setSubcategory: (subcategory: ISubcategory | null) => void;
  setBrand: (brand: IBrand) => void;
  setMeasurement: (measurement: IMeasurement) => void;
  setClothesState: (clothesState: IClothesState) => void;
  setColors: (colors: IColor[]) => void;
  /*   setPrice: (price: number) => void;
  setWeight: (weight: number) => void; */
  setIsShippingIncluded: (value: boolean) => void;

  resetStore: () => void;
};

export const useCreateProductStore = create<CreateProductState>()((set) => ({
  gender: '',
  clothesType: '',
  category: null,
  subcategory: null,
  brand: null,
  measurement: null,
  clothesState: null,
  colors: [],
  packageDeliveries: [],
  isShippingIncluded: false,

  setGender: (value: string) => set((state) => ({ gender: value })),
  setClothesType: (value: string) => set((_) => ({ clothesType: value })),
  setCategory: (value: ICategory) => set((_) => ({ category: value })),
  setSubcategory: (value: ISubcategory | null) =>
    set((_) => ({ subcategory: value })),
  setBrand: (value: IBrand) => set((_) => ({ brand: value })),
  setMeasurement: (value: IMeasurement) => set((_) => ({ measurement: value })),
  setClothesState: (value: IClothesState) =>
    set((_) => ({ clothesState: value })),
  setColors: (value: IColor[]) => set((_) => ({ colors: value })),

  setIsShippingIncluded: (value: boolean) =>
    set((_) => ({ isShippingIncluded: value })),

  resetStore: () =>
    set((_) => ({
      gender: '',
      clothesType: '',
      category: null,
      subcategory: null,
      brand: null,
      measurement: null,
      clothesState: null,
      colors: [],
      packageDeliveries: [],
      isShippingIncluded: false,
    })),
}));
