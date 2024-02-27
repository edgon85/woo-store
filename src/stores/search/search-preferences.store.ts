import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'


/* interface SearchPreferencesState {
  gender: string;
  clothesType: string;

  onSetGender: (value: string) => void;
  setClothesType: (value: string) => void;
}

export const usePersonalPreferencesStore = create<SearchPreferencesState>()(
  persist((set) => ({
    gender: 'mujer',
    clothesType: 'ropa',

    onSetGender: (value: string) => set((state) => ({ gender: value })),
    setClothesType: (value: string) => set((state) => ({ clothesType: value })),
  }), {name: ''})
);
 */