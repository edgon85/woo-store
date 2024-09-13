import { CheckMark } from '@/components/ui';
import { useModalStore } from '@/stores';

type Props = {
  clothesType: string;
  onClothesTypeChange: (value: string) => void;
};

export const SelectClothesType = ({
  clothesType,
  onClothesTypeChange,
}: Props) => {
  const closeModal = useModalStore((state) => state.closeModal);

  const handleOnclick = (value: string) => {
    onClothesTypeChange(value);
    closeModal();
  };
  return (
    <div className="flex flex-col">
      <div
        onClick={() => handleOnclick('ropa')}
        className={`flex justify-between items-center 'text-darkPrimary border-b py-4 cursor-pointer`}
      >
        <span>Ropa</span>
        {clothesType === 'ropa' ? (
          <CheckMark className="text-cerise-red-600 w-6 h-6" />
        ) : null}
      </div>
      <div
        onClick={() => handleOnclick('zapatos')}
        className={`flex justify-between items-center 'text-darkPrimary border-b py-4 cursor-pointer`}
      >
        <span>Zapatos</span>
        {clothesType === 'zapatos' ? (
          <CheckMark className="text-cerise-red-600 w-6 h-6" />
        ) : null}
      </div>
      <div
        onClick={() => handleOnclick('accesorios')}
        className={`flex justify-between items-center 'text-darkPrimary border-b py-4 cursor-pointer`}
      >
        <span>Accesorios</span>
        {clothesType === 'accesorios' ? (
          <CheckMark className="text-cerise-red-600 w-6 h-6" />
        ) : null}
      </div>
    </div>
  );
};
