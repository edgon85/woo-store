'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { BsShare } from 'react-icons/bs';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

type Props = {
  productName: string;
  productPrice: number;
};

export const ShareButton = ({ productName, productPrice }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathName = usePathname();

  useEffect(() => {
    const handler = (evt: any) => {
      if (isOpen && ref.current && !ref.current.contains(evt.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [isOpen]);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={togglePopover}
        className="flex justify-center items-center gap-2"
      >
        <BsShare className="text-cerise-red-600" size={24} />{' '}
        <span>Compartir</span>
      </button>
      {isOpen && (
        <div className="absolute z-10 right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
          <div className="py-4 flex gap-2 justify-center items-center">
            <FacebookShareButton
              url={`https://github.com/edgon85`}
              title={`Mira esta prenda que vi en woo.online, seguro te va a gustar! ¿Qué opinas? ${productName} por solo ${productPrice}`}
              onClick={() => setIsOpen(false)}
            >
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <WhatsappShareButton
              url={`https://github.com/edgon85`}
              title={`Mira esta prenda que vi en woo.online, seguro te va a gustar! ¿Qué opinas? ${productName} por solo ${productPrice}`}
              onClick={() => setIsOpen(false)}
            >
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
            <EmailShareButton
              url={'https://github.com/edgon85'}
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
