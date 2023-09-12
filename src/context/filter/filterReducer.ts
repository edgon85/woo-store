import { Filter, ICategory, ISubcategory } from '@/interfaces';
import { FilterState } from './';

type CategoryActionType =
  | { type: '[Filter] - gender'; payload: string }
  | { type: '[Filter] - clothes type'; payload: string }
  | { type: '[Filter] - category'; payload: ICategory }
  | { type: '[Filter] - category selected' }
  | { type: '[Filter] - subcategory'; payload: ISubcategory }
  | { type: '[Filter] - Brand selected' }
  | { type: '[Filter] - clothes state selected' }
  | { type: '[Filter] - Brands'; payload: string[] }
  | { type: '[Filter] - Filter list'; payload: Filter[] }
  | { type: '[Filter] - Measurement list'; payload: string[] }
  | { type: '[Filter] - Measurement selected' };

export const FilterReducer = (
  state: FilterState,
  action: CategoryActionType
): FilterState => {
  switch (action.type) {
    case '[Filter] - gender':
      return {
        ...state,
        gender: action.payload,
      };

    case '[Filter] - clothes type':
      return {
        ...state,
        clothesType: action.payload,
      };
    case '[Filter] - category':
      return {
        ...state,
        category: { ...action.payload },
        brands: [],
      };
    case '[Filter] - subcategory':
      return {
        ...state,
        brands: state.subcategory.id === '' ? [] : [...state.brands],
        subcategory: { ...action.payload },
      };
    case '[Filter] - category selected':
      return {
        ...state,
        isCategorySelected: !state.isCategorySelected,
      };
    case '[Filter] - Brand selected':
      return {
        ...state,
        isBrandSelected: !state.isBrandSelected,
      };
    case '[Filter] - Brands':
      return {
        ...state,
        brands: [...action.payload],
      };
    case '[Filter] - Measurement selected':
      return {
        ...state,
        isMeasurementSelected: !state.isMeasurementSelected,
      };
    case '[Filter] - clothes state selected':
      return {
        ...state,
        isClothesStateSelected: !state.isClothesStateSelected,
      };
    case '[Filter] - Measurement list':
      return {
        ...state,
        measurements: [...action.payload],
      };
    case '[Filter] - Filter list':
      return {
        ...state,
        filters: [...action.payload],
      };

    default:
      return state;
  }
};
