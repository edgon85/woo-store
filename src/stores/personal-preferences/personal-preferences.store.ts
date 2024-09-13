import { create } from 'zustand';
import Cookies from 'js-cookie';

interface PersonalPreferencesState {
  gender: string;
  clothesType: string;

  onSetGender: (value: string) => void;
  setClothesType: (value: string) => void;
}

export const usePersonalPreferencesStore = create<PersonalPreferencesState>()(
  (set) => {
    Cookies.set('gender', 'mujer');
    Cookies.set('clothesType', 'ropa');
    return {
      gender: 'mujer',
      clothesType: 'ropa',

      onSetGender: (value: string) =>
        set((state) => {
          Cookies.set('gender', value);
          return { gender: value };
        }),
      setClothesType: (value: string) =>
        set((state) => {
          Cookies.set('clothesType', value);
          return { clothesType: value };
        }),
    };
  }
);
