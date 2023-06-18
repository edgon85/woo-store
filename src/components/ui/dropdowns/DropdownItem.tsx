type Props = {
  icon: JSX.Element;
  title: string;
};

export const DropdownItem = ({ icon, title }: Props) => {
  return (
    <li>
      <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100 ">
        <span className="mr-2">{icon}</span>
        {title}
      </a>
    </li>
  );
};
