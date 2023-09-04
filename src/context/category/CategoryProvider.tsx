import { FC, useReducer } from 'react';
import { CategoryContext, CategoryReducer } from './';

export interface CategoryState {
  gender: string;
  clothesType: string;
}

const CATEGORY_INITIAL_STATE: CategoryState = {
  gender: 'mujer',
  clothesType: 'ropa',
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

  return (
    <CategoryContext.Provider
      value={{
        ...state,

        /* Methods */
        setGender,
        setClothesType,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
