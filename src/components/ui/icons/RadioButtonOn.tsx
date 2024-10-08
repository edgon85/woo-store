type IconProps = {
  className?: string;
};

export const RadioButtonOn = ({
  className = 'w-6 h-6 text-gray-500',
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1920 1920"
      fill="currentColor" // Permite que el color sea controlado por CSS
      className={className} // Permite personalizar el color y el tamaño
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M960 0c529.36 0 960 430.645 960 960 0 529.36-430.64 960-960 960-529.355 0-960-430.64-960-960C0 430.645 430.645 0 960 0Zm0 112.941c-467.125 0-847.059 379.934-847.059 847.059 0 467.12 379.934 847.06 847.059 847.06 467.12 0 847.06-379.94 847.06-847.06 0-467.125-379.94-847.059-847.06-847.059Zm0 313.726c294.55 0 533.33 238.781 533.33 533.333 0 294.55-238.78 533.33-533.33 533.33-294.552 0-533.333-238.78-533.333-533.33 0-294.552 238.781-533.333 533.333-533.333Z"
          fillRule="evenodd"
        ></path>
      </g>
    </svg>
  );
};
