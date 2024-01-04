import { updateProduct } from '@/actions';
import { AlertComponent } from '@/components/ui';
import { useEffect, useState } from 'react';

type Props = {
  productId: string;
  productStatus: string;
};

export const StatusSection = ({ productStatus, productId }: Props) => {
  const [isAvailable, setIsAvailable] = useState(productStatus === 'Available');
  const [alertType, setAlertType] = useState<'success' | 'error' | ''>('');

  useEffect(() => {
    setIsAvailable(productStatus === 'Available');
  }, [productStatus]);

  const handleCheckboxChange = async () => await onUpdateData();

  const onUpdateData = async () => {
    const status = !isAvailable ? 'Available' : 'Hidden';

    const data = {
      status,
    };
    const { ok } = await updateProduct(productId, data);
    setIsAvailable(!isAvailable);
    setAlertType(ok ? 'success' : 'error');
  };

  return (
    <>
      <div className=" flex justify-between items-center">
        <p className="block text-sm font-medium text-gray-900">Disponible:</p>

        <label className="relative inline-flex items-center cursor-pointer ">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={isAvailable}
            onChange={handleCheckboxChange}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lightPrimary rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-primary"></div>
        </label>
      </div>
      {alertType === 'success' && (
        <AlertComponent
          type="success"
          message="¡Producto actualizado!"
          onDismiss={() => setAlertType('')}
        />
      )}
      {alertType === 'error' && (
        <AlertComponent
          type="error"
          message="Ocurrió un error al actualizar"
          onDismiss={() => setAlertType('')}
        />
      )}
    </>
  );
};
