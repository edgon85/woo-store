import { useModal } from '@/hooks';
import { IoIosCheckmark } from 'react-icons/io';

type Props = {
  setGender: (gender: string) => void;
  gender: string;
};

export const SelectGender = ({ setGender, gender }: Props) => {
  const { onCloseModal } = useModal();

  const handleOnclick = (value: string) => {
    setGender(value);
    onCloseModal();
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
