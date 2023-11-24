import { TransactionStatus } from '../TransactionStatus';
import { IOrder, formatCurrency, formatDateToLocal } from '@/lib';
import { DownLoadGide, UpdateSale } from './buttons';

type Props = {
  orders: IOrder[];
};

export const TableSales = ({ orders }: Props) => {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {orders?.map((order: IOrder) => (
              <div
                key={order.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <picture>
                        <img
                          src={order.product.images[0]}
                          className="mr-2"
                          width={36}
                          height={36}
                          alt={`${order.product.title}'s picture`}
                        />
                      </picture>
                      <p>{order.product.title}</p>
                    </div>
                  </div>
                  <TransactionStatus status={order.orderStatus!} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(order.amount * 100)}
                    </p>
                    <p>{formatDateToLocal(order.orderDate)}</p>
                    {/* <p>20/12/2023</p> */}
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateSale id={order.id} />
                    {/* <DeleteInvoice id={invoice.id} /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Producto
                </th>

                <th scope="col" className="px-3 py-5 font-medium">
                  Monto
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Fecha de venta
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Estado
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Editar</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {orders?.map((order: IOrder) => (
                <tr
                  key={order.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <picture>
                        <img
                          src={order.product.images[0]}
                          className=""
                          width={36}
                          height={36}
                          alt={`${order.product.title}'s picture`}
                        />
                      </picture>
                      <p>{order.product.title}</p>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(order.amount * 100)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(order.orderDate)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <TransactionStatus status={order.orderStatus!} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateSale id={order.id} />
                      <DownLoadGide id={order.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
