import { IAddress } from '@/interfaces';
import { CheckoutState } from './CheckoutProvider';

type CheckoutActionType = {
  type: '[Checkout] - Add Address';
  payload: IAddress | null;
};

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

    default:
      return state;
  }
};
