import { FC, useEffect, useReducer } from 'react';

import { IAddress } from '@/interfaces';
import { CheckoutReducer, CheckoutContext } from './';
import { useSession } from 'next-auth/react';
import { useAuth, useCreateData, useLoadingData } from '@/hooks';
import { wooApi } from '@/wooApi';

export interface CheckoutState {
  loadingAddress: boolean;
  address?: IAddress | null;
}

const CHECKOUT_INITIAL_STATE: CheckoutState = {
  loadingAddress: false,
  address: null,
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const CheckoutProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(CheckoutReducer, CHECKOUT_INITIAL_STATE);
  // const { createData, loading, error } = useCreateData<IAddress>();

  const { user } = useAuth();
  useEffect(() => {
    loadAddresses(user?.token!);
  }, [user?.token]);

  const loadAddresses = async (token: string) => {
    try {
      const { data } = await wooApi.get<IAddress[]>('/shipping-address', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.length === 0) {
        dispatch({ type: '[Checkout] - Add Address', payload: null });
        return;
      }

      data.filter((address) => {
        if (address.isPrimary) {
          dispatch({ type: '[Checkout] - Add Address', payload: address });
          // console.log(address);
        }
      });
      return data;
      // setAddresses(data);
    } catch (error: any) {
      return error.response.data.message;
    }
  };

  const onSetShippingAddress = (shippingAddress: IAddress) =>
    dispatch({ type: '[Checkout] - Add Address', payload: shippingAddress });

  return (
    <CheckoutContext.Provider
      value={{
        ...state,

        /* methods */
        onSetShippingAddress,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
