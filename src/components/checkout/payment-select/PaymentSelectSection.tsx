'use client';

import { IPaymentMethod } from '@/lib';
import { useCheckoutStore } from '@/stores';
import { useState } from 'react';

type Props = {
  paymentMethods: IPaymentMethod[];
};

export const PaymentSelectSection = ({ paymentMethods }: Props) => {
  const [selectedOption, setSelectedOption] = useState<number>();
  const [label, setLabel] = useState('');
  const setPaymentMethod = useCheckoutStore((state) => state.setPaymentMethod);

  const onChangeInput = (option: IPaymentMethod) => {
    setPaymentMethod(option);
    setSelectedOption(option.id);
    setLabel(option.label);
  };

  return (
    <div className="bg-white border p-6 rounded shadow-sm">
      <h2 className="text-xl text-gray-400 mb-4">Método de pago</h2>

      <div className="flex gap-4">
        {paymentMethods.map((option: IPaymentMethod) => (
          <div key={option.id}>
            <div
              className={`mb-4 w-28 border rounded ${
                selectedOption === option.id && 'border-cerise-red-400'
              }`}
            >
              <label>
                <input
                  type="radio"
                  name="payment-method"
                  onChange={() => onChangeInput(option)}
                  checked={selectedOption === option.id}
                  className="hidden"
                />
                <div className="p-4 flex flex-col items-center justify-center gap-1 cursor-pointer">
                  <picture>
                    <img
                      src={option.logo}
                      alt={option.name}
                      className="w-12 h-8"
                    />
                  </picture>
                  <h3>{option.name}</h3>
                </div>
              </label>
            </div>
          </div>
        ))}
      </div>
      {selectedOption === 1 && <>{label}</>}
      {selectedOption === 2 && <>{label}</>}
      {selectedOption === 3 && <>{label}</>}
    </div>
  );
};
