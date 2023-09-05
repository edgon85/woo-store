import { FC, useReducer } from 'react';
import { CategoryContext, CategoryReducer } from './';

export interface CategoryState {
  gender: string;
  clothesType: string;
  categoryId: string;
  subcategoryId: string;
}

const CATEGORY_INITIAL_STATE: CategoryState = {
  gender: 'mujer',
  clothesType: 'ropa',
  categoryId: '59f36816-035b-44cb-bc32-30dd85a7cc14',
  subcategoryId: '',
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const CategoryProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(CategoryReducer, CATEGORY_INITIAL_STATE);

  const setGender = (gender: string) =>
    dispatch({ type: '[Category] - gender', payload: gender });

  const setClothesType = (clothesType: string) =>
    dispatch({ type: '[Category] - clothes type', payload: clothesType });

  const setCategoryId = (categoryId: string) =>
    dispatch({ type: '[Category] - category', payload: categoryId });

  const setSubcategoryId = (subcategoryId: string) =>
    dispatch({ type: '[Category] - subcategory', payload: subcategoryId });

  return (
    <CategoryContext.Provider
      value={{
        ...state,

        /* Methods */
        setGender,
        setClothesType,
        setCategoryId,
        setSubcategoryId,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
