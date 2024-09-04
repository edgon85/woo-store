import { Balance } from '@/interfaces';
import { formatCurrency } from '@/utils';
import { ClipboardDocumentIcon } from '../ui';

type Props = {
  data: Balance;
};

export const TablePaid = ({ data }: Props) => {
  return (
    <section className="mb-4">
      <div className="relative overflow-x-auto">
        <p className="px-6 py-3 text-lg font-semibold bg-gray-50">
          Pagos realizados
        </p>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Producto
              </th>
              <th scope="col" className="px-6 py-3">
                Estado
              </th>
              <th scope="col" className="px-6 py-3">
                Precio
              </th>
              <th scope="col" className="px-6 py-3">
                Comisión
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {data.orders.length === 0 ? (
              <tr className="bg-white w-full text-center">
                <td colSpan={5} className="text-center">
                  <p className="px-6 py-4 text-gray-700 flex flex-col justify-center items-center gap-4">
                    <ClipboardDocumentIcon className="w-28 h-28" />
                    <span>Todavía no tienes ventas</span>
                  </p>
                </td>
              </tr>
            ) : (
              <>
                {data.orders.map((order: any) => (
                  <tr key={order.id} className="bg-white border-b ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize"
                    >
                      {order.product.title}
                    </th>
                    <td className="px-6 py-4">
                      {!order.paid ? <span>pagado</span> : <span>pagado</span>}
                    </td>
                    <td className="px-6 py-4">
                      {formatCurrency(order.product.price * 100)}
                    </td>
                    <td className="px-6 py-4">
                      {formatCurrency(order.summary.serviceFeeSeller * 100)}
                    </td>
                    <td className="px-6 py-4">
                      {formatCurrency(
                        (order.summary.productPrice -
                          order.summary.serviceFeeSeller) *
                          100
                      )}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
