'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface ListItemProps {
  id: string;
  href: string;
  label: string;
}
export const ListItem = ({ href, label, id }: ListItemProps) => {
  const pathname = usePathname();

  const baseClasses =
    'block w-full pl-1 py-4 border-gray-200 cursor-pointer hover:bg-gray-200 hover:text-darkPrimary';
  const currentClasses = pathname.includes(id) ? 'text-darkPrimary' : '';
  return (
    <Link
      href={href}
      aria-current={href.includes(id) ? 'true' : 'false'}
      className={`${baseClasses} ${currentClasses}`}
    >
      {label}
    </Link>
  );
};
