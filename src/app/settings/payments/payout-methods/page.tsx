import Link from 'next/link';

export default function PayoutMethodsPage() {
  return (
    <div>
      <h2 className="text-lg font-bold">Cómo recibes los cobros</h2>
      <p className="w-6/12 mt-4 mb-8">
        Puedes enviar tu dinero a una o más formas de cobro. Para administrar
        las formas cobro o asignar un contribuyente, utiliza el menú para editar
        cada caso
      </p>

      <Link
        href={'/settings/payments/payout-methods/add'}
        className="mt-8 border p-2 rounded bg-cerise-red-600 hover:bg-cerise-red-500 text-white"
      >
        Agregar una forma de cobro
      </Link>
    </div>
  );
}
