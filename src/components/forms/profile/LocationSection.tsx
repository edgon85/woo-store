import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { FormData } from './ProfileForm';

const departamentosGuatemala: string[] = [
  'Alta Verapaz',
  'Baja Verapaz',
  'Chimaltenango',
  'Chiquimula',
  'Petén',
  'El Progreso',
  'Quiché',
  'Escuintla',
  'Guatemala',
  'Huehuetenango',
  'Izabal',
  'Jalapa',
  'Jutiapa',
  'Quetzaltenango',
  'Retalhuleu',
  'Sacatepéquez',
  'San Marcos',
  'Santa Rosa',
  'Sololá',
  'Suchitepéquez',
  'Totonicapán',
  'Zacapa',
];

type Props = {
  setValue: UseFormSetValue<FormData>;
  register: UseFormRegister<FormData>;
};

export const LocationSection = ({ setValue, register }: Props) => {
  return (
    <>
      <h2 className="text-base text-gray-700">Mi ubicación</h2>
      <div className="flex justify-between items-center py-4">
        <label className="flex-1  block text-base font-medium text-gray-700">
          País
        </label>
        <select className=" flex-1 w-full p-2 border rounded-md">
          <option value="">Guatemala</option>
        </select>
      </div>

      {/* <!-- Divider --> */}
      <hr className="" />

      {/* <!-- Ciudad --> */}
      <div className="bg-white w-full flex justify-between items-center py-4">
        <label className="flex-1 block text-base font-medium text-gray-700">
          Ciudad
        </label>
        <select
          className="flex-1 w-full p-2 border rounded-md"
          {...register('location')}
          onChange={({ target }) => setValue('location', target.value)}
        >
          <option value="">Elegir ciudad</option>
          {departamentosGuatemala.map((departamento) => (
            <option key={departamento} value={departamento}>
              {departamento}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
