import {
  IBrand,
  ICategory,
  IClothesState,
  IColor,
  IDepartment,
  IMeasurement,
  IMunicipality,
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
  colors: IColor[];
  isShippingIncluded: boolean;
  department: IDepartment | null;
  municipality: IMunicipality | null;

  setGender: (value: string) => void;
  setClothesType: (value: string) => void;
  setCategory: (category: ICategory) => void;
  setSubcategory: (subcategory: ISubcategory | null) => void;
  setBrand: (brand: IBrand) => void;
  setMeasurement: (measurement: IMeasurement) => void;
  setClothesState: (clothesState: IClothesState) => void;
  setColors: (colors: IColor[]) => void;
  setIsShippingIncluded: (value: boolean) => void;
  setDepartment: (value: IDepartment) => void;
  setMunicipality: (value: IMunicipality) => void;

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
  isOriginShippingAvailable: false,
  department: null,
  municipality: null,

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

  setDepartment: (value: IDepartment) => set((_) => ({ department: value })),
  setMunicipality: (value: IMunicipality) =>
    set((_) => ({ municipality: value })),

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
