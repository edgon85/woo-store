import { CreateFormAddress } from './CreateForm';

export const AddNewAddress = () => {
  return (
    <>
      <div className="bg-white border p-6 rounded shadow-sm">
        <h2 className="text-xl font-bold mb-2">Dirección</h2>

        <div className="space-y-2 flex items-center gap-4">
          <p className="text-lg">Agregar dirección</p>

          <CreateFormAddress />
        </div>
      </div>
    </>
  );
};
