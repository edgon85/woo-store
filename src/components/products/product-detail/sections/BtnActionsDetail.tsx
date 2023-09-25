'use client';

import { Button, TooltipIcon } from '@/components';
import { useAuth } from '@/hooks';
import { ActionButton } from '../../product-card';
import { IProduct } from '@/interfaces';

import { BtnMakeOffer } from './BtnMakeOffer';

type ActionsProps = {
  product: IProduct;
};

export const BtnActionsDetail = ({ product }: ActionsProps) => {
  const { user } = useAuth();
  return (
    <section className=" flex flex-col gap-4">
      <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
        <span>Envíos a todo el país</span>
        <span>|</span>
        <span>Protección al comprador</span>
        <TooltipIcon />
      </div>
      <ActionButton
        product={product}
        productUser={product.user!}
        user={user!}
      />
      <BtnMakeOffer product={product} />
      <Button label="Enviar mensaje" type="button" outlined />
    </section>
  );
};
