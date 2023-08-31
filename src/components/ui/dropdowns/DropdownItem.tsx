import Link from 'next/link';

type Props = {
  icon: JSX.Element;
  title: string;
  path?: string;
};

export const DropdownItem = ({ icon, title, path = '#' }: Props) => {
  return (
    <li>
      <Link
        href={path}
        className="flex items-center px-4 py-2 hover:bg-gray-100 "
      >
        <span className="mr-2">{icon}</span>
        {title}
      </Link>
    </li>
  );
};
