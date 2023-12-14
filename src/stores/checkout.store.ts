import { IAddress, IProduct } from '@/interfaces';
import { IPackageDelivery, IPaymentMethod } from '@/lib';
import { create } from 'zustand';

interface CheckoutState {
  serviceFee: number;
  address: IAddress | null;
  product: IProduct | null;
  paymentMethod: IPaymentMethod | null;
  packageDelivery: IPackageDelivery | null;

  setShippingAddress: (shippingAddress: IAddress) => void;
  setProduct: (product: IProduct) => void;
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
  setProduct: (value: IProduct) => set({ product: value }),
  setPaymentMethod: (value: IPaymentMethod) => set({ paymentMethod: value }),
  setPackageDelivery: (value: IPackageDelivery) =>
    set({ packageDelivery: value }),

  computed: {
    get amount() {
      return (
        Number(get().product?.price) +
        Number(get().packageDelivery?.originalPrice) +
        get().serviceFee
      );
    },
  },
}));
