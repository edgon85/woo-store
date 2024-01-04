import { ChangeEvent, useState } from 'react';

import { useCreateProductStore } from '@/stores';

export const PriceSection = () => {
  const [value, setValue] = useState<string>('');
  const setPrice = useCreateProductStore((state) => state.setPrice);

  const handleOnchange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: inputVal } = event.target;

    const isNumber = /^[0-9]*$/.test(inputVal);

    if (isNumber || inputVal === '') {
      setValue(inputVal);
    }

    setPrice(Number(inputVal));
  };

  const formatNumberWithCommas = (valor: string) => {
    if (valor === '') return '0'; // Valor por defecto si está vacío
    const number = parseInt(valor, 10);
    return number.toLocaleString();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mt-4">
      <div className="relative z-0 w-full mb-6 group p-4 md:p-0">
        <label
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Precio de venta{' '}
          {value && <span>Q{formatNumberWithCommas(value)}</span>}
        </label>

        <input
          type="text"
          value={value}
          // value={value}
          onChange={handleOnchange}
          className="block w-full p-4 text-gray-900 border border-divider rounded-md  sm:text-md focus:ring-lightPrimary focus:border-lightPrimary outline-none"
          placeholder="¿A qué precio lo vendes?"
        />
      </div>
    </div>
  );
};
