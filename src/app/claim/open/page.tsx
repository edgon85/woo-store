import { fetchOrderById } from '@/actions';
import { Accordion } from '@/components/claim/Accordion';
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

  const images = order.product.images.map((image: any) => image);
  const { product, summary } = order;

  return (
    <div className="w-full md:w-1/2 md:m-auto min-h-[70vh] py-4">
      <div className="flex flex-col items-center">
        <h2 className="mb-4 text-base font-semibold">Necesito ayuda</h2>
        <div className="flex gap-2">
          <picture>
            <img src={images[0]} alt={product.title} width={200} />
          </picture>
          <div>
            <p>{product.title}</p>
            <p>{formatCurrency(summary.total * 100)}</p>
          </div>
        </div>
      </div>

      <Accordion />
    </div>
  );
}
