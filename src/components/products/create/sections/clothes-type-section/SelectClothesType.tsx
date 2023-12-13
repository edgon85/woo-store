import { useCreateProductStore, useModalStore } from '@/stores';
import { IoIosCheckmark } from 'react-icons/io';

export const SelectClothesType = () => {
  const closeModal = useModalStore((state) => state.closeModal);
  const clothesType = useCreateProductStore((state) => state.clothesType);
  const setClothesType = useCreateProductStore((state) => state.setClothesType);

  const handleOnclick = (value: string) => {
    setClothesType(value);
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
          <IoIosCheckmark size={24} color="var(--primary)" />
        ) : null}
      </div>
      <div
        onClick={() => handleOnclick('zapatos')}
        className={`flex justify-between items-center 'text-darkPrimary border-b py-4 cursor-pointer`}
      >
        <span>Zapatos</span>
        {clothesType === 'zapatos' ? (
          <IoIosCheckmark size={24} color="var(--primary)" />
        ) : null}
      </div>
      <div
        onClick={() => handleOnclick('accesorios')}
        className={`flex justify-between items-center 'text-darkPrimary border-b py-4 cursor-pointer`}
      >
        <span>Accesorios</span>
        {clothesType === 'accesorios' ? (
          <IoIosCheckmark size={24} color="var(--primary)" />
        ) : null}
      </div>
    </div>
  );
};
