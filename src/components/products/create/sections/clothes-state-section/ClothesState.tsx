import { CheckMark } from '@/components/ui';
import { IClothesState } from '@/interfaces';
import { useCreateProductStore, useModalStore } from '@/stores';

type Props = {
  clothingConditionList: IClothesState[];
};

export const ClothesState = ({ clothingConditionList }: Props) => {
  const setClothesState = useCreateProductStore(
    (state) => state.setClothesState
  );
  const clotheState = useCreateProductStore((state) => state.clothesState);

  const closeModal = useModalStore((state) => state.closeModal);

  const handleClick = (clothesState: IClothesState) => {
    setClothesState(clothesState);
    closeModal();
  };

  return (
    <ul>
      {clothingConditionList.map((resp) => (
        <li
          onClick={() => handleClick(resp)}
          className="flex justify-between items-center px-1 py-2 border-b cursor-pointer hover:bg-lightPrimary"
          key={resp.id}
        >
          <div className="">
            <h6 className="text-lg capitalize">{resp.title}</h6>
            <p className="text-gray-500">{resp.subtitle}</p>
          </div>
          {clotheState?.id === resp.id ? (
            <CheckMark className="text-cerise-red-600 w-6 h-6" />
          ) : null}
        </li>
      ))}
    </ul>
  );
};
