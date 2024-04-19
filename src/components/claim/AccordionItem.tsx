import React from 'react';

interface AccordionItemProps {
  index: number;
  heading: string;
  isActive: boolean;
  toggleAccordion: (index: number) => void;
  children: React.ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  index,
  heading,
  isActive,
  toggleAccordion,
  children,
}) => {
  return (
    <>
      <h2 id={`accordion-collapse-heading-${index}`}>
        <button
          type="button"
          className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl hover:bg-gray-100 gap-3 ${
            isActive ? 'bg-gray-100' : ''
          }`}
          onClick={() => toggleAccordion(index)}
          aria-expanded={isActive}
          aria-controls={`accordion-collapse-body-${index}`}
        >
          <span>{heading}</span>
          <svg
            data-accordion-icon
            className={`w-3 h-3 rotate-180 shrink-0 ${
              isActive ? 'rotate-0' : ''
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id={`accordion-collapse-body-${index}`}
        className={`${
          isActive ? 'block' : 'hidden'
        } p-5 border border-gray-200`}
        aria-labelledby={`accordion-collapse-heading-${index}`}
      >
        {children}
      </div>
    </>
  );
};
