import { ModalResetPassword } from './reset-password/ModalResetPassword';

export const ResetPasswordSection = () => {
  return (
    <>
      <div className="bg-white p-4 w-full ">
        <div className=" flex justify-between items-center py-2">
          <div className="flex-1">
            <p className="block text-base font-medium text-gray-700">
              Contraseña
            </p>
          </div>
          <div className="flex-1">
            <ModalResetPassword />
          </div>
        </div>
      </div>
    </>
  );
};
