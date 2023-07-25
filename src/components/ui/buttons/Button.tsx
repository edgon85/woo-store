import { MouseEvent } from 'react';
import { IconType } from 'react-icons/lib';

type Props = {
  label: string;
  type: string;
  disabled?: boolean;
  outlined?: boolean;
  small?: boolean;
  icon?: IconType;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const Button = ({
  label,
  type,
  disabled,
  outlined,
  small,
  icon: Icon,
  onClick,
}: Props) => {
  return (
    <button
      type={type as HTMLButtonElement['type']}
      onClick={onClick}
      disabled={disabled}
      className={`
            relative
            disabled:opacity-70
            disabled:cursor-not-allowed
            rounded-lg
            hover:opacity-80
            transition
            w-full
            ${outlined ? 'bg-white' : 'bg-primary'}
            ${outlined ? 'border-black' : 'border-primary'}
            ${outlined ? 'text-black' : 'text-white'}
            ${small ? 'text-sm' : 'text-md'}
            ${small ? 'py-1' : 'py-3'}
            ${small ? 'font-light' : 'font-semibold'}
            ${small ? 'border-[1px]' : 'border-2'}
        `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};
