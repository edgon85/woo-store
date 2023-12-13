import { ItemCreate } from '../ItemCreate';
import { BsCheck2Circle } from 'react-icons/bs';
import { useCreateProductStore, useModalStore } from '@/stores';
import { ClothesState } from './ClothesState';


export const ClothesStateSection = () => {
  const clothesState = useCreateProductStore((state) => state.clothesState);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <ItemCreate
      title="Estado"
      icon={BsCheck2Circle}
      value={clothesState?.title!}
      onClick={() =>
        openModal(
          <div className=" w-72 md:w-96 p-4">
            <ClothesState />
          </div>
        )
      }
    />
  );
};
