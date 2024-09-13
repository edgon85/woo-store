import { MouseEvent } from 'react';

type Props = {
  label: string;
  type: string;
  disabled?: boolean;
  outlined?: boolean;
  small?: boolean;
  icon?: JSX.Element;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const Button = ({
  label,
  type,
  disabled,
  outlined,
  small,
  icon,
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
            rounded
            hover:bg-gradient-to-br hover:from-cerise-red-600 hover:to-cerise-red-700
            transition
            w-full
            flex
            justify-center
            items-center
            gap-2
            ${
              outlined
                ? 'bg-[var(--bg)]'
                : 'bg-gradient-to-r from-cerise-red-500 to-cerise-red-600'
            }
            ${outlined ? 'border-none' : 'border-none'}
            ${outlined ? 'text-primary' : 'text-white'}
            ${small ? 'text-sm' : 'text-md'}
            ${small ? 'py-1' : 'py-3'}
            ${small ? 'font-light' : 'font-semibold'}
            ${small ? 'border-[1px]' : 'border-2'}
        `}
    >
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      {label}
    </button>
  );
};
