'use client';

import { ChangeEvent, useRef } from 'react';
import {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  useForm,
} from 'react-hook-form';

type FormData = {
  photo: string;
  biography: string;
  location: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
};

export const ProfileForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <form>
      <div className="bg-white p-4 w-full">
        {/* <!-- Tu foto y botón --> */}
        <FileInputPhoto setValue={setValue} />
      </div>
      {/* <!-- Divider --> */}
      <hr className="" />

      {/* <!-- Sobre mí --> */}
      <div className="bg-white p-4 w-full flex justify-between">
        <label
          htmlFor="sobreMi"
          className="flex-1 block text-base font-medium text-gray-700"
        >
          Sobre mí
        </label>
        <textarea
          id="sobreMi"
          rows={3}
          className=" flex-1 w-full p-2 border rounded-md resize-none"
          placeholder="Cuéntanos más sobre ti"
        ></textarea>
      </div>

      {/* <!-- Divider --> */}
      <hr className="" />

      {/* <!-- País --> */}
      <div className="bg-white p-4 w-full ">
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
          <select className="flex-1 w-full p-2 border rounded-md">
            <option value="">Elegir ciudad</option>
            <option value="Madrid">Madrid</option>
            <option value="Barcelona">Barcelona</option>
            {/* <!-- ... otras ciudades ... --> */}
          </select>
        </div>
      </div>
      {/* <!-- Divider --> */}
      <hr className="" />

      {/* <!-- Mostrar ubicación en el perfil --> */}
      <div className="bg-white flex items-center justify-between p-4">
        <span className="text-base text-gray-700">
          Mostrar ubicación en el perfil
        </span>
        <div>
          <label className="inline-flex items-center mr-3">
            <input
              type="radio"
              className="form-radio"
              name="mostrarUbicación"
              value="si"
            />
            <span className="ml-2">Sí</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="mostrarUbicación"
              value="no"
            />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>
      <hr className="" />
      {/* <!-- Mostrar ubicación en el perfil --> */}
      <div className="bg-white flex items-center justify-between p-4 mb-4">
        <label className="flex-1 block text-base font-medium text-gray-700">
          Fecha de nacimiento
        </label>
        <input
          type="date"
          className=" flex-1 w-full p-2 border rounded-md"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            console.log(e.target.value); // Aquí puedes manejar la fecha seleccionada
          }}
        />
      </div>

      <div className="bg-white p-4 w-full ">
        <div className="flex justify-between items-center py-4">
          <label className="flex-1  block text-base font-medium text-gray-700">
            Genero
          </label>
          <select className=" flex-1 w-full p-2 border rounded-md">
            <option value="male">Mujer</option>
            <option value="female">Hombre</option>
          </select>
        </div>
      </div>

      <div className="bg-white p-4 w-full">
        <div className="flex  items-center py-4">
          <label className="flex-1 text-base font-medium text-gray-700">
            Teléfono
          </label>
          <div className="flex-1">
            <input
              type="tel"
              className="w-full p-2 border rounded-md"
              pattern="^\d{8}$"
              placeholder="Ingrese 8 dígitos"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                console.log(e.target.value); // Aquí puedes manejar el número ingresado
              }}
            />
            <p className="text-red-600 text-xs mt-1">
              Debe contener exactamente 8 dígitos.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 ">
        <button className="bg-primary hover:bg-darkPrimary text-white py-2 p-4 rounded">
          Actualizar perfil
        </button>
      </div>
    </form>
  );
};

type PropsFileInput = {
  setValue: UseFormSetValue<FormData>;
};
export const FileInputPhoto = ({ setValue }: PropsFileInput) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChoosePhotoClick = () => {
    console.log('click');
    fileInputRef.current?.click();
  };

  const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    // target.preventDefault();
    if (!target.files || target.files.length === 0) {
      return;
    }

    const file = target.files?.[0];
    if (file) {
      // setValue('photo', file)
      const formData = new FormData();
      // Aquí puedes manejar el archivo seleccionado
    }
  };

  return (
    <div className="flex justify-between items-center">
      <h3 className="text-base font-medium text-gray-700">Tu foto</h3>
      <div className="flex justify-center items-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
        <button
          onClick={handleChoosePhotoClick}
          type="button"
          className="border border-primary text-primary hover:bg-gray-200 px-4 py-2 rounded"
        >
          Elegir foto
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          // {...register('photo')}
        />
      </div>
    </div>
  );
};
