import { useCreateProductStore, useModalStore } from '@/stores';
import { SelectCategory } from './SelectCategory';
import { ItemCreate } from '../ItemCreate';

export const CategorySection = () => {
  const category = useCreateProductStore((state) => state.category);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <ItemCreate
      title="Categoría"
      value={category?.title!}
      onClick={() =>
        openModal(
          <div className=" w-72 md:w-96 p-4">
            <SelectCategory />
          </div>
        )
      }
    />
  );
};
