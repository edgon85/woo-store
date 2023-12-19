import {
  IBrand,
  ICategory,
  IClothesState,
  IColor,
  IMeasurement,
  ISubcategory,
} from '@/interfaces';
import { IPackageDelivery } from '@/lib';
import { create } from 'zustand';

type CreateProductState = {
  gender: string;
  clothesType: string;
  category: ICategory | null;
  subcategory: ISubcategory | null;
  brand: IBrand | null;
  measurement: IMeasurement | null;
  clothesState: IClothesState | null;
  colors: IColor[];
  price: number;
  packageDeliveries: IPackageDelivery[];

  setGender: (value: string) => void;
  setClothesType: (value: string) => void;
  setCategory: (category: ICategory) => void;
  setSubcategory: (subcategory: ISubcategory) => void;
  setBrand: (brand: IBrand) => void;
  setMeasurement: (measurement: IMeasurement) => void;
  setClothesState: (clothesState: IClothesState) => void;
  setColors: (colors: IColor[]) => void;
  setPrice: (price: number) => void;
  setPackageDeliveries: (packageDelivery: IPackageDelivery[]) => void;
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
  price: 0,
  packageDeliveries: [],

  //onSetGender: (value: string) => set((state) => ({ gender: value })),
  setGender: (value: string) => set((state) => ({ gender: value })),
  setClothesType: (value: string) => set((state) => ({ clothesType: value })),
  setCategory: (value: ICategory) => set((state) => ({ category: value })),
  setSubcategory: (value: ISubcategory) =>
    set((state) => ({ subcategory: value })),
  setBrand: (value: IBrand) => set((state) => ({ brand: value })),
  setMeasurement: (value: IMeasurement) =>
    set((state) => ({ measurement: value })),
  setClothesState: (value: IClothesState) =>
    set((state) => ({ clothesState: value })),
  setColors: (value: IColor[]) => set((state) => ({ colors: value })),
  setPrice: (value: number) => set((state) => ({ price: value })),
  setPackageDeliveries: (value: IPackageDelivery[]) =>
    set((state) => ({ packageDeliveries: value })),
}));
