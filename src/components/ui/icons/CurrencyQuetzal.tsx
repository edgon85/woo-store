type IconProps = {
  className?: string;
};

export const CurrencyQuetzal = ({
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
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 12m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0"></path>
      <path d="M13 13l5 5"></path>
    </svg>
  );
};
