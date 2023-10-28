import { IAddress, IProduct } from '@/interfaces';
import { CheckoutState } from './CheckoutProvider';

type CheckoutActionType =
  | { type: '[Checkout] - Add Address'; payload: IAddress | null }
  | { type: '[Checkout] - Add product'; payload: IProduct | null };

export const CheckoutReducer = (
  state: CheckoutState,
  action: CheckoutActionType
): CheckoutState => {
  switch (action.type) {
    case '[Checkout] - Add Address':
      return {
        ...state,
        loadingAddress: true,
        address: action.payload,
      };
    case '[Checkout] - Add product':
      return {
        ...state,
        product: action.payload,
      };

    default:
      return state;
  }
};
