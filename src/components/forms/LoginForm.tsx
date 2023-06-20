import Link from 'next/link';

export const LoginForm = () => {
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
        <span className="text-sm">¿No tienes cuenta? </span>
        <Link href="/auth/register" className="text-primary underline text-sm">
          crear cuenta
        </Link>
      </div>
      <div className="mt-6 w-full bg-background rounded-md p-6 text-center">
        <span className="text-sm">¿Ha olvidado su contraseña? </span>
        <Link href="#" className="text-primary underline text-sm uppercase">
          recuperar
        </Link>
      </div>
    </div>
  );
};
