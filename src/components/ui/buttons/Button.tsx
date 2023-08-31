import { MouseEvent } from 'react';
import { IconType } from 'react-icons/lib';

type Props = {
  label: string;
  type: string;
  disabled?: boolean;
  outlined?: boolean;
  small?: boolean;
  icon?: IconType;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
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
            flex
            justify-center
            items-center
            gap-2
            ${outlined ? 'bg-[var(--bg)]' : 'bg-primary'}
            ${outlined ? 'border-primary' : 'border-primary'}
            ${outlined ? 'text-primary' : 'text-white'}
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
