import { CategoryState } from './';

type CategoryActionType =
  | { type: '[Category] - gender'; payload: string }
  | { type: '[Category] - clothes type'; payload: string };

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

    default:
      return state;
  }
};
