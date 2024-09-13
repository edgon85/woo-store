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
        openModal(
          <div className=" w-72 md:w-96 p-4">
            <SelectCategory gender={gender} clothesType={clothesType} />
          </div>
        )
      }
    />
  );
};
