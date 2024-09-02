'use client';
import { useSidebar } from '@/stores';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface ListItemProps {
  id: string;
  href: string;
  label: string;
  isMobile?: boolean;
}
export const ListItem = ({
  href,
  label,
  id,
  isMobile = false,
}: ListItemProps) => {
  const pathname = usePathname();
  const menuModal = useSidebar((state) => state.onSidebarOpen);

  const baseClasses =
    'block w-full pl-1 py-4 border-gray-200 cursor-pointer hover:bg-gray-200 hover:text-darkPrimary';
  const currentClasses = pathname.includes(id) ? 'text-darkPrimary' : '';
  return (
    <Link
      onClick={() => {
        if (isMobile) {
          menuModal();
        }
      }}
      href={href}
      aria-current={href.includes(id) ? 'true' : 'false'}
      className={`${baseClasses} ${currentClasses}`}
    >
      {label}
    </Link>
  );
};
