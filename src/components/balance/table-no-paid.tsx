import { Balance } from '@/interfaces';
import { formatCurrency } from '@/utils';

type Props = {
  data: Balance;
};

export const TableNoPaid = ({ data }: Props) => {
  return (
    <section className="mb-4">
      <div className="relative overflow-x-auto">
        <p className="px-6 py-3 text-lg font-semibold bg-gray-50 w-full">
          Pagos pendientes
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
            {data.orders.map((order: any) => (
              <tr key={order.id} className="bg-white border-b ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize"
                >
                  {order.product.title}
                </th>
                <td className="px-6 py-4">
                  {order.paid ? <span>pagado</span> : <span>pendiente</span>}
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
            <tr className="">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              ></th>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4 bg-cerise-red-500 text-white">
                Mi balance
              </td>
              <td className="px-6 py-4 bg-cerise-red-500 text-white">
                {formatCurrency(data.balance * 100)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
