import Link from 'next/link';

export const RegisterForm = () => {
  return (
    <div className="w-full">
      <form>
        <div className="mb-3">
          <label
            htmlFor="large-input"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Correo
          </label>
          <input
            type="text"
            id="large-input"
            className="block w-full p-4 text-gray-900 border border-divider rounded-md  sm:text-md focus:ring-lightPrimary focus:border-lightPrimary outline-none"
            placeholder="Nombre y apellido"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="large-input"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Nombre y apellido
          </label>
          <input
            type="email"
            id="large-input"
            className="block w-full p-4 text-gray-900 border border-divider rounded-md  sm:text-md focus:ring-lightPrimary focus:border-lightPrimary outline-none"
            placeholder="user@correo.com"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password-input"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password-input"
            className="block w-full p-4 text-gray-900 border border-divider rounded-md  sm:text-md focus:ring-lightPrimary focus:border-lightPrimary outline-none"
            placeholder="contraseña"
          />
        </div>

        <button
          type="submit"
          className="bg-primary w-full py-2 text-lg text-white uppercase rounded-md shadow-md cursor-pointer"
        >
          iniciar sesión
        </button>
      </form>
      <div className="mt-4 text-center">
        <span className="text-sm">¿ya tienes cuenta? </span>
        <Link href="/auth/login" className="text-primary underline text-sm">
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
};
