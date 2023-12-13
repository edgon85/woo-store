import { useCreateProductStore, useModalStore } from '@/stores';
import { IoIosCheckmark } from 'react-icons/io';

export const SelectGender = () => {
  const gender = useCreateProductStore((state) => state.gender);
  const setGender = useCreateProductStore((state) => state.setGender);

  const closeModal = useModalStore((state) => state.closeModal);

  const handleOnclick = (value: string) => {
    setGender(value);
    closeModal();
  };
  return (
    <div className="flex flex-col">
      <div
        onClick={() => handleOnclick('mujer')}
        className={`flex justify-between items-center 'text-darkPrimary border-b py-4 cursor-pointer`}
      >
        <span>Mujer</span>
        {gender === 'mujer' ? (
          <IoIosCheckmark size={24} color="var(--primary)" />
        ) : null}
      </div>
      <div
        onClick={() => handleOnclick('hombre')}
        className={`flex justify-between items-center 'text-darkPrimary border-b py-4 cursor-pointer`}
      >
        <span>Hombre</span>
        {gender === 'hombre' ? (
          <IoIosCheckmark size={24} color="var(--primary)" />
        ) : null}
      </div>
    </div>
  );
};
