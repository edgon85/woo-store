'use client';
import { useOnClickOutside } from '@/hooks';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import { ShareIcon } from '../ui';

export const BtnShareProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathName = usePathname();

  useOnClickOutside(ref, () => setIsOpen(false));

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={togglePopover}
        className="flex justify-center items-center gap-1 px-4 py-2 md:min-w-[100px] font-bold rounded bg-gradient-to-r from-cerise-red-500 to-cerise-red-600 hover:bg-gradient-to-br hover:from-cerise-red-600 hover:to-cerise-red-700 text-white"
      >
        <span>
          <ShareIcon className="w-6 h-6 text-white" />
        </span>
        <span className="hidden md:block">Compartir</span>
      </button>
      {isOpen && (
        <div className="absolute z-10 right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
          <div className="py-4 flex gap-2 justify-center items-center">
            <FacebookShareButton
              url={`${process.env.BASE_URL}${pathName}`}
              title={`Mira mi perfil en woo store, seguro te va a gustar! ¿Qué opinas?`}
              onClick={() => setIsOpen(false)}
            >
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <WhatsappShareButton
              url={`${process.env.BASE_URL}${pathName}`}
              title={`Mira mi perfil en woo store, seguro te va a gustar! ¿Qué opinas?`}
              onClick={() => setIsOpen(false)}
            >
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
            <EmailShareButton
              url={`${process.env.BASE_URL}${pathName}`}
              title={`Mira mi perfil en woo store, seguro te va a gustar! ¿Qué opinas?`}
              onClick={() => setIsOpen(false)}
            >
              <EmailIcon size={32} round={true} />
            </EmailShareButton>
          </div>
        </div>
      )}
    </div>
  );
};
