import Link from 'next/link';

export interface ListItemProps {
  href: string;
  label: string;
  isCurrent?: boolean;
}
export const ListItem = ({ href, label, isCurrent = false }: ListItemProps) => {
  const baseClasses =
    'block w-full pl-1 py-4 border-gray-200 cursor-pointer hover:bg-gray-200 hover:text-darkPrimary';
  const currentClasses = isCurrent ? 'text-gray-900' : '';
  return (
    <Link
      href={href}
      aria-current={isCurrent ? 'true' : 'false'}
      className={`${baseClasses} ${currentClasses}`}
    >
      {label}
    </Link>
  );
};
