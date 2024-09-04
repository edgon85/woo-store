import { ArrowRightIcon } from '@/components/ui';

type Props = {
  title: string;
  value: string;
  icon?: JSX.Element;
  onClick: () => void;
  uppercase?: boolean;
};

export const ItemCreate = ({
  title,
  value,
  icon,
  onClick,
  uppercase,
}: Props) => {
  return (
    <div
      className="flex justify-between items-center w-full md:border-b border-divider/50 py-4 px-4 md:px-0 cursor-pointer"
      onClick={onClick}
    >
      <p className="flex gap-2 items-center">
        {icon && <span className="absolute left-4 top-3">{icon}</span>} {title}
      </p>
      <span className="text-primary flex gap-2 items-center capitalize">
        {uppercase ? value.toUpperCase() : value}{' '}
        <ArrowRightIcon className="text-gray-400 w-4 h-4" />
      </span>
    </div>
  );
};
