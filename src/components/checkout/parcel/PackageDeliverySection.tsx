'use client';

import { PackageDeliverySkeleton, RadiaSelectIcon } from '@/components/ui';
import { IPackageDelivery } from '@/interfaces';
import { formatCurrency } from '@/utils';
import { useCheckoutStore } from '@/stores';
import { useEffect, useState } from 'react';
import { IoMdRadioButtonOff } from 'react-icons/io';
import { fetchPackageDelivery } from '@/actions';

type Props = {
  packagesDeliveriesIds: number[];
};

export const PackageDeliverySection = ({ packagesDeliveriesIds }: Props) => {
  const [selectedOption, setSelectedOption] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);
  const [packagesDelivery, setPackagesDelivery] = useState<IPackageDelivery[]>(
    []
  );

  useEffect(() => {
    getPackageDeliveries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPackageDeliveries = async () => {
    const packagesDeliveries = (await fetchPackageDelivery(
      packagesDeliveriesIds
    )) as IPackageDelivery[];
    setPackagesDelivery(packagesDeliveries);
    setIsLoading(false);
  };

  const setPackageDelivery = useCheckoutStore(
    (state) => state.setPackageDelivery
  );

  const onChangeOption = (option: IPackageDelivery) => {
    setSelectedOption(option.id);
    setPackageDelivery(option);
  };

  return (
    <>
      {isLoading ? (
        <div className="bg-white border p-6 rounded shadow-sm">
          <PackageDeliverySkeleton />
        </div>
      ) : (
        <div className="bg-white border p-6 rounded shadow-sm">
          <h2 className="text-xl text-gray-400 mb-4">Paquetería</h2>
          {packagesDelivery.map((option: IPackageDelivery) => (
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
                  onChange={() => onChangeOption(option)}
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
                        {formatCurrency(+option.originalPrice * 100)}
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
                      <RadiaSelectIcon
                        className="text-cerise-red-500"
                        size="24"
                      />
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
      )}
    </>
  );
};
