import { ArrowRightIcon, ChevronRightIcon, MapIcon } from '@/components/ui';

type Props = {
  title: string;
  value: string;
  icon?: JSX.Element;
  subtitle?: string;
  onClick: () => void;
  uppercase?: boolean;
};

export const ItemCreate = ({
  title,
  value,
  icon,
  onClick,
  uppercase,
  subtitle
}: Props) => {
  return (
    <div
      className="flex justify-between items-center w-full md:border-b border-divider/50 py-4 px-4 md:px-0 cursor-pointer"
      onClick={onClick}
    >
      <div>
        <p className="flex gap-2 items-center">
          {icon} {title}
        </p>
        {subtitle && <span className="text-xs text-gray-400">{subtitle}</span>}
      </div>

      <span className="text-primary flex gap-2 items-center capitalize">
        {uppercase ? value.toUpperCase() : value}{' '}
        <ChevronRightIcon className="text-gray-400 w-6 h-6 font-bold" />
      </span>
    </div>
  );
};
