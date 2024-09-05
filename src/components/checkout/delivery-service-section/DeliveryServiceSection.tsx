'use client';

import {
  ShippingServiceSkeleton,
  RadioButtonOff,
  RadioButtonOn,
} from '@/components/ui';
import { IShippingService } from '@/interfaces';
import { formatCurrency } from '@/utils';
import { useCheckoutStore } from '@/stores';
import { useCallback, useEffect, useState } from 'react';
import { fetchShippingService } from '@/actions';

type Props = {
  isShippingIncluded: boolean;
};

export const ShippingServiceSection = ({ isShippingIncluded }: Props) => {
  const address = useCheckoutStore((state) => state.address);
  const setPayment = useCheckoutStore((state) => state.setPaymentMethod);
  const setShippingService = useCheckoutStore(
    (state) => state.setShippingService
  );
  const [selectedOption, setSelectedOption] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);
  const [shippingService, setShipping] = useState<IShippingService[]>([]);

  const getShippingServiceList = useCallback(async () => {
    if (!address?.municipality?.slug) return;

    setIsLoading(true);
    const { ok, data, message } = await fetchShippingService(
      address?.municipality.slug!
    );

    if (!ok) {
      setIsLoading(false);
    } else {
      setShipping(data);
      setShippingService(null);
      setPayment(null);
      setSelectedOption(0);
      setIsLoading(false);
    }
  }, [address?.municipality.slug, setShippingService, setPayment]);

  const onChangeOption = (option: IShippingService) => {
    setSelectedOption(option.id);
    setShippingService(option);
  };

  useEffect(() => {
    getShippingServiceList();
  }, [getShippingServiceList]);

  return (
    <>
      {isLoading ? (
        <div className="bg-white border p-6 rounded shadow-sm">
          <ShippingServiceSkeleton />
        </div>
      ) : (
        <div className="bg-white border p-6 rounded shadow-sm">
          <h2 className="text-xl text-gray-400 mb-4">Paquetería</h2>
          {shippingService.map((ppd: IShippingService) => (
            <div
              key={ppd.id}
              className={`mb-4 border rounded ${
                selectedOption === ppd.id && 'border-cerise-red-400'
              }`}
            >
              <label className="flex items-center">
                <input
                  type="radio"
                  name="deliveryOption"
                  onChange={() => onChangeOption(ppd)}
                  checked={selectedOption === ppd.id}
                  className="hidden"
                />
                <div className="flex justify-between w-full items-center p-2 cursor-pointer">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4 items-center">
                      <picture className="">
                        <img
                          className={`w-20 ${
                            ppd.id === 3 ? 'bg-red-600' : 'bg-transparent'
                          }`}
                          src={ppd.logo}
                          alt={`logo ${ppd.name}`}
                        />
                      </picture>
                      <h3 className="text-lg font-medium">{ppd.name}</h3>
                    </div>

                    {/* ······································································ */}
                    <div>
                      {isShippingIncluded ? (
                        <>
                          <span className="text-lg text-green-600 font-medium">
                            Envío Gratis
                          </span>
                          <span className="ml-2 text-sm text-gray-500">
                            (Valor original:{' '}
                            {formatCurrency(ppd.regularPrice * 100)})
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-lg text-green-600 font-medium">
                            {ppd.discountedPrice !== 0 &&
                            ppd.discountedPrice < ppd.regularPrice
                              ? formatCurrency(ppd.discountedPrice * 100)
                              : formatCurrency(ppd.regularPrice * 100)}
                          </span>
                          {ppd.discountedPrice !== 0 &&
                            ppd.discountedPrice < ppd.regularPrice && (
                              <>
                                <span className="ml-2 line-through text-gray-500">
                                  {formatCurrency(ppd.regularPrice * 100)}
                                </span>
                                <span className="ml-2 text-sm text-red-500">
                                  (
                                  {Math.round(
                                    (1 -
                                      ppd.discountedPrice / ppd.regularPrice) *
                                      100
                                  )}
                                  % descuento)
                                </span>
                              </>
                            )}
                        </>
                      )}
                    </div>
                    <span className="text-gray-600">
                      Entrega a domicilio en {ppd.deliveryTime}
                    </span>
                  </div>
                  <div>
                    {selectedOption === ppd.id ? (
                      <RadioButtonOn className="text-cerise-red-500 w-6 h-6" />
                    ) : (
                      <RadioButtonOff className="text-gray-300 w-6 h-6" />
                    )}
                  </div>
                </div>
              </label>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
