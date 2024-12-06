import {
  IAddress,
  IShippingService,
  IProduct,
  IPaymentMethod,
} from '@/interfaces';
import { create } from 'zustand';

interface IProductWithOffer extends IProduct {
  offerPrice?: number;
  offerId?: string;
  offerStatus?: string;
}

interface CheckoutState {
  // serviceFee: number;
  address: IAddress | null;
  product: IProductWithOffer | null;
  paymentMethod: IPaymentMethod | null;
  shippingService: IShippingService | null;

  setShippingAddress: (shippingAddress: IAddress) => void;
  setProduct: (product: IProductWithOffer) => void;
  setPaymentMethod: (paymentMethod: IPaymentMethod | null) => void;
  setShippingService: (shippingService: IShippingService | null) => void;

  computed: {
    amount: number;
  };
}

export const useCheckoutStore = create<CheckoutState>()((set, get) => ({
  // serviceFee: Number(process.env.SERVICE_FEE),
  address: null,
  product: null,
  paymentMethod: null,
  shippingService: null,

  setShippingAddress: (value: IAddress) => set({ address: value }),
  setProduct: (value: IProductWithOffer) => set({ product: value }),
  setPaymentMethod: (value: IPaymentMethod | null) => set({ paymentMethod: value }),
  setShippingService: (value: IShippingService | null) =>
    set({ shippingService: value }),

  computed: {
    get amount() {
      const product = get().product;
      const priceToUse = product?.offerPrice ?? product?.price ?? 0;
      const deliveryService = get().shippingService;
      const drp = deliveryService?.regularPrice;
      const ddp = deliveryService?.discountedPrice;
      const dpToUse = ddp !== 0 && ddp! < drp! ? ddp : drp;
      const deliveryPrice = product?.isShippingIncluded ? 0 : dpToUse;
      return priceToUse + Number(deliveryPrice ?? 0);
    },
  },
}));
