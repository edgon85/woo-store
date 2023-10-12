'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface ListItemProps {
  href: string;
  label: string;
}
export const ListItem = ({ href, label }: ListItemProps) => {
  const pathname = usePathname();

  const baseClasses =
    'block w-full pl-1 py-4 border-gray-200 cursor-pointer hover:bg-gray-200 hover:text-darkPrimary';
  const currentClasses = href === pathname ? 'text-darkPrimary' : '';
  return (
    <Link
      href={href}
      aria-current={href === pathname ? 'true' : 'false'}
      className={`${baseClasses} ${currentClasses}`}
    >
      {label}
    </Link>
  );
};
