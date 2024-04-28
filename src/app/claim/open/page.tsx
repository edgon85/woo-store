import { checkImageAvailable, fetchOrderById } from '@/actions';
import { AccordionComponent } from '@/components/claim/Accordion';
import { formatCurrency } from '@/lib';
import { redirect } from 'next/navigation';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ClaimOpenPage({ searchParams }: Props) {
  const { transaction, reason } = searchParams;
  if (!transaction || !reason) {
    redirect('/');
  }

  const order = await fetchOrderById(transaction.toString());

  const imageUrl = await checkImageAvailable(order.product.images[0]);

  const { product, summary } = order;

  return (
    <div className="w-full md:w-1/2 md:m-auto min-h-[70vh] py-4">
      <div className="flex flex-col items-center">
        <h2 className="mb-4 text-base font-semibold">Necesito ayuda</h2>
        <div className="flex gap-2">
          <picture>
            <img
              src={imageUrl ?? '/empty-image.svg'}
              alt={product.title}
              width={200}
            />
          </picture>
          <div>
            <p className="text-lg font-semibold">{product.title}</p>
            <p className="text-base">{formatCurrency(summary.total * 100)}</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-4">¿Cómo podemos ayudarte?</p>
        <AccordionComponent order={order!} />
      </div>
    </div>
  );
}
