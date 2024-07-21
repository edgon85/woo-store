import { checkImageAvailable, fetchOrderById } from '@/actions';
import { AccordionComponent } from '@/components/claim/Accordion';
import { formatCurrency } from '@/utils';
import { redirect } from 'next/navigation';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ClaimOpenPage({ searchParams }: Props) {
  const { transaction, reason } = searchParams;
  if (!transaction || !reason) {
    redirect('/');
  }

  const { ok, data, message } = await fetchOrderById(transaction.toString());

  if (!ok) {
    return (
      <div className="main-wrapper">
        <p>{message}</p>
      </div>
    );
  }

  const imageUrl = await checkImageAvailable(data.product.images[0]);

  const { product, summary } = data;

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
        <AccordionComponent order={data!} />
      </div>
    </div>
  );
}
