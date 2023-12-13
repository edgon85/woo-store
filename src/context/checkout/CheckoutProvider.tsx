import { FC, useEffect, useReducer } from 'react';

import { IAddress, IProduct } from '@/interfaces';
import { CheckoutReducer, CheckoutContext } from './';
import { IPackageDelivery, IPaymentMethod } from '@/lib';

export interface CheckoutState {
  serviceFee: number;
  address?: IAddress | null;
  product: IProduct | null;
  paymentMethod: IPaymentMethod | null;
  packageDelivery: IPackageDelivery | null;
}

const CHECKOUT_INITIAL_STATE: CheckoutState = {
  serviceFee: 0,
  address: null,
  product: null,
  paymentMethod: null,
  packageDelivery: null,
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const CheckoutProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(CheckoutReducer, CHECKOUT_INITIAL_STATE);


  //  const { user } = useAuth();
  useEffect(() => {
    state.serviceFee = Number(process.env.SERVICE_FEE);
  }, [state]);

  /*   const loadAddresses = async (token: string) => {
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
  }; */

  const onSetShippingAddress = (shippingAddress: IAddress) =>
    dispatch({ type: '[Checkout] - Add Address', payload: shippingAddress });

  const onAddCheckoutProduct = (product: IProduct) =>
    dispatch({
      type: '[Checkout] - Add product',
      payload: product,
    });

  const onSetPaymentMethod = (paymentMethod: IPaymentMethod) =>
    dispatch({
      type: '[Checkout] - Add Payment Method',
      payload: paymentMethod,
    });

  const onSetPackageDelivery = (packageDelivery: IPackageDelivery) =>
    dispatch({
      type: '[Checkout] - Add package delivery',
      payload: packageDelivery,
    });

  return (
    <CheckoutContext.Provider
      value={{
        ...state,

        /* methods */
        onSetShippingAddress,
        onAddCheckoutProduct,
        onSetPaymentMethod,
        onSetPackageDelivery,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
