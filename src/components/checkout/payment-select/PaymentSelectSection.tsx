'use client';

import { useState } from 'react';

export const PaymentSelectSection = () => {
  const [selectedOption, setSelectedOption] = useState();

  const options = [
    { id: 1, logo: '/credit_card.png', name: 'Tarjeta', label: '' },
    {
      id: 2,
      logo: '/payment_cash.png',
      name: 'Efectivo',
      label: 'paga al recibir el producto',
    },
    {
      id: 3,
      logo: '/payment_cash.png',
      name: 'Transferencia',
      label:
        'Deberás hacer el pago dentro de las siguientes 48 horas, de lo contrario el código de pago caducará.',
    },
  ];
  return (
    <div className="bg-white border p-6 rounded shadow-sm">
      <h2 className="text-xl text-gray-400 mb-4">Método de pago</h2>

      <div className="flex gap-4">
        {options.map((option: any) => (
          <>
            <div
              key={option.id}
              className={`mb-4 w-28 border rounded ${
                selectedOption === option.id && 'border-cerise-red-400'
              }`}
            >
              <label>
                <input
                  type="radio"
                  name="payment-method"
                  onChange={() => setSelectedOption(option.id)}
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
          </>
        ))}
      </div>
      {selectedOption === 1 && <>Pago con tarjeta</>}
      {selectedOption === 2 && <>Pago contra entrega</>}
      {selectedOption === 3 && <>Transferencia bancaria</>}
    </div>
  );
};
