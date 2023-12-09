import { create } from 'zustand';

interface PersonalPreferencesState {
  gender: string;
  clothesType: string;

  onSetGender: (value: string) => void;
  setClothesType: (value: string) => void;
}

export const usePersonalPreferencesStore = create<PersonalPreferencesState>()(
  (set) => ({
    gender: 'mujer',
    clothesType: 'ropa',

    onSetGender: (value: string) => set((state) => ({ gender: value })),
    setClothesType: (value: string) => set((state) => ({ clothesType: value })),
  })
);
