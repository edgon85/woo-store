import { ItemCreate } from '../ItemCreate';
import { BsCheck2Circle } from 'react-icons/bs';
import { useCreateProductStore, useModalStore } from '@/stores';
import { ClothesState } from './ClothesState';
import { IClothesState } from '@/interfaces';

type Props = {
  clothingConditionList: IClothesState[];
};

export const ClothesStateSection = ({ clothingConditionList }: Props) => {
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
            <ClothesState clothingConditionList={clothingConditionList} />
          </div>
        )
      }
    />
  );
};
