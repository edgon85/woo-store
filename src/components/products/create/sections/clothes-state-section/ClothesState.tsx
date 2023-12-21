import { useFetcher } from '@/hooks';
import { IClothesState } from '@/interfaces';
import { useCreateProductStore, useModalStore } from '@/stores';
import { IoIosCheckmark } from 'react-icons/io';

type Props = {
  clothingConditionList: IClothesState[];
};

export const ClothesState = ({ clothingConditionList }: Props) => {
  const setClothesState = useCreateProductStore(
    (state) => state.setClothesState
  );
  const clotheState = useCreateProductStore((state) => state.clothesState);

  // const { data } = useFetcher<IClothesState[]>(`/clothes-state`);
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
            <IoIosCheckmark size={24} color="var(--primary)" />
          ) : null}
        </li>
      ))}
    </ul>
  );
};
