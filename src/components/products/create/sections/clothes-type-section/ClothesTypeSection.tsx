import { ItemCreate } from '../ItemCreate';
import { useCreateProductStore, useModalStore } from '@/stores';
import { SelectClothesType } from './SelectClothesType';

export const ClothesTypeSection = () => {
  const clothesType = useCreateProductStore((state) => state.clothesType);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <ItemCreate
      title="Tipo de prenda"
      value={clothesType}
      onClick={() =>
        openModal(
          <div className=" w-72 md:w-96 p-4">
            <SelectClothesType />
          </div>
        )
      }
    />
  );
};
