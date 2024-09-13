'use client';

import { useState } from 'react';

type Props = {
  biography: string;
};

export const DetailProfile = ({ biography }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div
        className={`px-4 py-2 ${
          isExpanded ? 'max-h-full' : 'max-h-24'
        } overflow-hidden`}
      >
        <p className="whitespace-pre-wrap">{biography}</p>
      </div>
      <div className="px-4 py-2">
        <button
          className="text-cerise-red-400 font-semibold focus:outline-none"
          onClick={toggleExpand}
        >
          {biography && biography.length > 100 ? (
            <>{isExpanded ? 'Ver menos' : 'Ver más'}</>
          ) : null}
        </button>
      </div>
    </>
  );
};
