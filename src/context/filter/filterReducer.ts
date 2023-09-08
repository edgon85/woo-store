import { ICategory, ISubcategory } from '@/interfaces';
import { FilterState } from './';

type CategoryActionType =
  | { type: '[Filter] - gender'; payload: string }
  | { type: '[Filter] - clothes type'; payload: string }
  | { type: '[Filter] - category'; payload: ICategory }
  | { type: '[Filter] - category selected' }
  | { type: '[Filter] - Brand selected' }
  | { type: '[Filter] - subcategory'; payload: ISubcategory };

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
      };
    case '[Filter] - subcategory':
      return {
        ...state,
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

    default:
      return state;
  }
};
