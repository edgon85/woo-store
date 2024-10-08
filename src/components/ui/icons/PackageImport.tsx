type IconProps = {
  className?: string;
};

export const PackageImport = ({
  className = 'w-6 h-6 text-gray-500',
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path d="M12 21l-8 -4.5v-9l8 -4.5l8 4.5v4.5"></path>
      <path d="M12 12l8 -4.5"></path>
      <path d="M12 12v9"></path>
      <path d="M12 12l-8 -4.5"></path>
      <path d="M22 18h-7"></path>
      <path d="M18 15l-3 3l3 3"></path>
    </svg>
  );
};
