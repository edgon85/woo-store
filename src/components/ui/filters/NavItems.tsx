'use client'

import { useState } from "react";

type Props = {
  title: string;
  items: JSX.Element | JSX.Element[];
//   isOpen: boolean;
//   onClick: () => void;
};
export const MenuItem = ({ title, items }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <li>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 focus:outline-none"
      >
        <span>{title}</span>
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 15l7-7 7 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </button>
      {isOpen && <ul className="">{items}</ul>}
    </li>
  );
};
