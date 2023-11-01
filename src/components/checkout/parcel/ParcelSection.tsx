'use client';
import { RadiaSelectIcon, SpinnerIcon } from '@/components/ui';
import { useFetcher, useLoadingData } from '@/hooks';
import { useState } from 'react';
import { BsCircleFill } from 'react-icons/bs';
import { IoMdRadioButtonOff } from 'react-icons/io';

export const ParcelSection = () => {
  const [selectedOption, setSelectedOption] = useState();

  const { data, loading, errorMessage } = useLoadingData('/package-delivery');

  if (loading) {
    return (
      <div className="w-96 flex justify-center items-center">
        <SpinnerIcon className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white border p-6 rounded shadow-sm">
      <h2 className="text-xl text-gray-400 mb-4">Paquetería</h2>
      {data?.map((option: any) => (
        <div
          key={option.id}
          className={`mb-4 border rounded ${
            selectedOption === option.id && 'border-cerise-red-400'
          }`}
        >
          <label className="flex items-center">
            <input
              type="radio"
              name="deliveryOption"
              onChange={() => setSelectedOption(option.id)}
              checked={selectedOption === option.id}
              className="hidden"
            />
            <div className="flex justify-between w-full items-center p-2 cursor-pointer">
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <picture className="">
                    <img
                      className={`w-20 ${
                        option.id === 3 ? 'bg-red-600' : 'bg-transparent'
                      }`}
                      src={option.logo}
                      alt={`logo ${option.name}`}
                    />
                  </picture>
                  <h3 className="text-lg font-medium">{option.name}</h3>
                </div>
                <div>
                  <span className="text-lg text-green-600 font-medium">
                    {option.originalPrice}
                  </span>
                  {/* {option.originalPrice && (
                    <span className="ml-2 line-through text-gray-500">
                      {option.originalPrice}
                    </span>
                  )} */}
                </div>
                <span className="text-gray-600">
                  Entrega a domicilio en {option.deliveryTime}
                </span>
              </div>
              <div>
                {selectedOption === option.id ? (
                  <RadiaSelectIcon className="text-cerise-red-500" size="24" />
                ) : (
                  <IoMdRadioButtonOff
                    size={24}
                    className="text-cerise-red-300"
                  />
                )}
              </div>
            </div>
          </label>
        </div>
      ))}
    </div>
  );
};
