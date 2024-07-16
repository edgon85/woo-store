import { getReceivedOffer } from '@/actions';
import { OfferList } from '@/components';

export default async function OfferPage() {
  const { data: offers, ok, message } = await getReceivedOffer();

  return (
    <div className="">
      {ok ? (
        offers.length > 0 ? (
          <>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
              Ofertas Recibidas
            </h1>
            <OfferList offers={offers} />
          </>
        ) : (
          <div className="flex flex-col justify-center items-center gap-4">
            <p className="text-lg text-gray-600">
              No hay ofertas recibidas en este momento.
            </p>
            <picture>
              <img src="/empty-image.svg" alt="Empty image" width={400} />
            </picture>
          </div>
        )
      ) : (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{message}</span>
        </div>
      )}
    </div>
  );
}
