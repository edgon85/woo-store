import { ItemCreate } from '../ItemCreate';
import { useCreateProductStore, useModalStore } from '@/stores';
import { ClothesState } from './ClothesState';
import { IClothesState } from '@/interfaces';
import { CircleCheck } from '@/components/ui';

type Props = {
  clothingConditionList: IClothesState[];
};

export const ClothesStateSection = ({ clothingConditionList }: Props) => {
  const clothesState = useCreateProductStore((state) => state.clothesState);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <ItemCreate
      title="Estado"
      icon={<CircleCheck />}
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
