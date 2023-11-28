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
      <BtnMakeOffer product={product} />
      <Button label="Enviar mensaje" type="button" outlined />
    </section>
  );
};
