import { Button, TooltipIcon } from '@/components';
import { ActionButton } from '../../product-card';
import { IProduct } from '@/interfaces';

import { BtnMakeOffer } from './BtnMakeOffer';

type ActionsProps = {
  product: IProduct;
  currentUserId: string;
};

export const BtnActionsDetail = ({ product, currentUserId }: ActionsProps) => {
  return (
    <section className=" flex flex-col gap-4">
      <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
        <span>Envíos a todo el país</span>
        <span>|</span>
        <span>Protección al comprador</span>
        <TooltipIcon />
      </div>
      <ActionButton product={product} currentUserId={currentUserId} />
      {currentUserId !== product.user?.id && (
        <>
          <BtnMakeOffer product={product} />
          <button
            className="w-full border border-cerise-red-700 text-cerise-red-700 text-sm hover:bg-cerise-red-500 hover:text-white rounded flex justify-center items-center py-2"
            // onClick={onOpenModal}
          >
            Enviar mensaje
          </button>
        </>
      )}
    </section>
  );
};
