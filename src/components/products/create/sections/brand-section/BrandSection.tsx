import { IoMdPricetags } from 'react-icons/io';

import { useCreateProductStore, useModalStore } from '@/stores';
import { BrandSelect } from './BrandSelect';
import { ItemCreate } from '../ItemCreate';
import { IBrand } from '@/interfaces';

type Props = {
  brands: IBrand[];
};

export const BrandSection = ({ brands }: Props) => {
  const brand = useCreateProductStore((state) => state.brand);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <ItemCreate
      title="Marca"
      icon={IoMdPricetags}
      value={`${brand?.title !== undefined ? brand?.title : ''}`}
      onClick={() =>
        openModal(
          <div className=" w-72 md:w-96 p-4">
            <BrandSelect brands={brands} />
          </div>
        )
      }
    />
  );
};
