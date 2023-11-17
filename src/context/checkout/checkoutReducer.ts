import { IAddress, IProduct } from '@/interfaces';
import { CheckoutState } from './CheckoutProvider';
import { IPackageDelivery, IPaymentMethod } from '@/lib';

type CheckoutActionType =
  | { type: '[Checkout] - Add Address'; payload: IAddress | null }
  | { type: '[Checkout] - Add product'; payload: IProduct | null }
  | {
      type: '[Checkout] - Add package delivery';
      payload: IPackageDelivery | null;
    }
  | { type: '[Checkout] - Add Payment Method'; payload: IPaymentMethod | null };

export const CheckoutReducer = (
  state: CheckoutState,
  action: CheckoutActionType
): CheckoutState => {
  switch (action.type) {
    case '[Checkout] - Add Address':
      return {
        ...state,
        address: action.payload,
      };
    case '[Checkout] - Add product':
      return {
        ...state,
        product: action.payload,
      };
    case '[Checkout] - Add Payment Method':
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case '[Checkout] - Add package delivery':
      return {
        ...state,
        packageDelivery: action.payload,
      };

    default:
      return state;
  }
};
