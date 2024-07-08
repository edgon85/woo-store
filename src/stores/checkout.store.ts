import { IAddress, IProduct } from '@/interfaces';
import { IPackageDelivery, IPaymentMethod } from '@/lib';
import { create } from 'zustand';

interface IProductWithOffer extends IProduct {
  offerPrice?: number;
  offerId?: string;
  offerStatus?: string;
}

interface CheckoutState {
  serviceFee: number;
  address: IAddress | null;
  product: IProductWithOffer | null;
  paymentMethod: IPaymentMethod | null;
  packageDelivery: IPackageDelivery | null;

  setShippingAddress: (shippingAddress: IAddress) => void;
  setProduct: (product: IProductWithOffer) => void;
  setPaymentMethod: (paymentMethod: IPaymentMethod) => void;
  setPackageDelivery: (packageDelivery: IPackageDelivery) => void;

  computed: {
    amount: number;
  };
}

export const useCheckoutStore = create<CheckoutState>()((set, get) => ({
  serviceFee: Number(process.env.SERVICE_FEE),
  address: null,
  product: null,
  paymentMethod: null,
  packageDelivery: null,

  setShippingAddress: (value: IAddress) => set({ address: value }),
  setProduct: (value: IProductWithOffer) => set({ product: value }),
  setPaymentMethod: (value: IPaymentMethod) => set({ paymentMethod: value }),
  setPackageDelivery: (value: IPackageDelivery) =>
    set({ packageDelivery: value }),

  computed: {
    get amount() {
      const product = get().product;
      const priceToUse = product?.offerPrice ?? product?.price ?? 0;
      return (
        priceToUse +
        Number(get().packageDelivery?.originalPrice ?? 0) +
        get().serviceFee
      );
    },
  },
}));
