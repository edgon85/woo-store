
import { ItemCreate } from '../ItemCreate';
import { useCreateProductStore, useModalStore } from '@/stores';
import { SelectSubcategory } from './SelectSubcategory';

export const SubcategorySection = () => {
  const subcategory = useCreateProductStore((state) => state.subcategory);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <ItemCreate
      title="Subcategoría"
      value={subcategory?.title!}
      onClick={() =>
        openModal(
          <div className=" w-72 md:w-96 p-4">
            <SelectSubcategory />
          </div>
        )
      }
    />
  );
};
