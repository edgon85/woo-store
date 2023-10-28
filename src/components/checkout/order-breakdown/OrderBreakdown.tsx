import { Divider } from '@/components/ui';

export const OrderBreakdown = () => {
  return (
    <section className="bg-white border p-6 rounded shadow-sm">
      <h2>Desglose del pedido</h2>
      <Divider />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p>Precio</p>
          <p>Q300.00</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Envío</p>
          <p>Q35.00</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Tarifa de servicio</p>
          <p>Q12.00</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Total a pagar</p>
          <p>Q347.00</p>
        </div>
      </div>
    </section>
  );
};
