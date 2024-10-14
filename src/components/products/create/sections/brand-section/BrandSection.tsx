import { useCreateProductStore, useModalStore } from '@/stores';
import { BrandSelect } from './BrandSelect';
import { ItemCreate } from '../ItemCreate';
import { IBrand } from '@/interfaces';
import { TagPriceIcon } from '@/components/ui';

type Props = {
  brands: IBrand[];
};

export const BrandSection = ({ brands }: Props) => {
  const brand = useCreateProductStore((state) => state.brand);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <ItemCreate
      title="Marca"
      icon={<TagPriceIcon />}
      value={`${brand?.title !== undefined ? brand?.title : ''}`}
      onClick={() =>
        openModal(<BrandSelect brands={brands} />, 'Seleccione Marca')
      }
    />
  );
};
