import { ICategory, ISubcategory } from '@/interfaces';
import { CategoryState } from './';

type CategoryActionType =
  | { type: '[Category] - gender'; payload: string }
  | { type: '[Category] - clothes type'; payload: string }
  | { type: '[Category] - category'; payload: ICategory }
  | { type: '[Category] - category selected' }
  | { type: '[Category] - Brand selected' }
  | { type: '[Category] - subcategory'; payload: ISubcategory };

export const CategoryReducer = (
  state: CategoryState,
  action: CategoryActionType
): CategoryState => {
  switch (action.type) {
    case '[Category] - gender':
      return {
        ...state,
        gender: action.payload,
      };

    case '[Category] - clothes type':
      return {
        ...state,
        clothesType: action.payload,
      };
    case '[Category] - category':
      return {
        ...state,
        category: { ...action.payload },
      };
    case '[Category] - subcategory':
      return {
        ...state,
        subcategory: { ...action.payload },
      };
    case '[Category] - category selected':
      return {
        ...state,
        isCategorySelected: !state.isCategorySelected,
      };
    case '[Category] - Brand selected':
      return {
        ...state,
        isBrandSelected: !state.isBrandSelected,
      };

    default:
      return state;
  }
};
