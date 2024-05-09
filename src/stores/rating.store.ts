import { create } from 'zustand';

export interface RatingState {
  shippingSpeed: number;
  accurateDescription: number;
  sellerCommunication: number;
  productCleanliness: number;
  packagePresentation: number;
  comment: string;

  setShippingSpeed: (value: number) => void;
  setAccurateDescription: (value: number) => void;
  setSellerCommunication: (value: number) => void;
  setProductCleanliness: (value: number) => void;
  setPackagePresentation: (value: number) => void;
  setComment: (value: string) => void;
}

export const useRatingStore = create<RatingState>()((set) => ({
  shippingSpeed: 0,
  accurateDescription: 0,
  sellerCommunication: 0,
  productCleanliness: 0,
  packagePresentation: 0,
  comment: '',

  setShippingSpeed: (value: number) => set({ shippingSpeed: value }),
  setAccurateDescription: (value) => set({ accurateDescription: value }),
  setSellerCommunication: (value) => set({ sellerCommunication: value }),
  setProductCleanliness: (value) => set({ productCleanliness: value }),
  setPackagePresentation: (value) => set({ packagePresentation: value }),
  setComment: (value) => set({ comment: value }),
}));
