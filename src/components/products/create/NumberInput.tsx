import { ChangeEvent, useState } from 'react';


type Props = {
    setPrice: (price: number) => void;
}

export const NumberInput = ({ setPrice }: Props) => {
  const [value, setValue] = useState<string>('');

  const handleOnchange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: inputVal } = event.target;

    const isNumber = /^[0-9]*$/.test(inputVal);

    if (isNumber || inputVal === '') {
      setValue(inputVal);
    }
      
      setPrice(Number(inputVal));
  };

  // Función para formatear el número con comas
  const formatNumberWithCommas = (valor: string) => {
    if (valor === '') return '0'; // Valor por defecto si está vacío
    const number = parseInt(valor, 10);
    return number.toLocaleString();
  };

  return (
    <div className="relative z-0 w-full mb-6 group">
      <label
        htmlFor="price"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Precio de venta {value && <span>Q{formatNumberWithCommas(value)}</span>}
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
  );
};
