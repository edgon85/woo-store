type Props = {
  className?: string;
};

export const SendIcon = ({ className = 'w-6 h-6 text-gray-500' }: Props) => {
  return (
    <svg
      //   className="w-5 h-5 rotate-90 rtl:-rotate-90"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 18 20"
    >
      <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
    </svg>
  );
};
