import { IconType } from 'react-icons';
import { IoIosArrowForward } from 'react-icons/io';

type Props = {
  title: string;
  value: string;
  icon?: IconType;
  onClick: () => void;
  uppercase?: boolean;
};

export const ItemCreate = ({ title, value, icon: Icon, onClick, uppercase }: Props) => {
  return (
    <div
      className="flex justify-between items-center w-full border-b border-divider/50 py-4 px-4 md:px-0 cursor-pointer"
      onClick={onClick}
    >
      <p className="flex gap-2 items-center">
        {Icon && <Icon size={24} />} {title}
      </p>
      <span className="text-primary flex gap-2 items-center capitalize">
        {uppercase ? value.toUpperCase() : value} <IoIosArrowForward size={16} color="gray" />
      </span>
    </div>
  );
};
