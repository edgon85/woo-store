import { useCreateProductStore, useModalStore } from '@/stores';
import { SelectCategory } from './SelectCategory';
import { ItemCreate } from '../ItemCreate';

type Props = {
  gender: string;
  clothesType: string;
};

export const CategorySection = ({ gender, clothesType }: Props) => {
  const category = useCreateProductStore((state) => state.category);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <ItemCreate
      title="Categoría"
      value={category?.title!}
      onClick={() =>
        openModal(<SelectCategory gender={gender} clothesType={clothesType} />)
      }
    />
  );
};
