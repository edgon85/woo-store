'use client';
import Link from 'next/link';

type ErrorPageProps = {
  error: Error;
};

export default function ErrorPage({ error }: ErrorPageProps) {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Oops! Algo salió mal
        </h1>
        <p className="text-gray-700 mb-4">
          Lo sentimos, ha ocurrido un error al cargar los productos. Por favor,
          intenta de nuevo más tarde.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <p className="text-sm text-gray-500 mb-4">Error: {error.message}</p>
        )}
        <Link href="/" className="text-blue-500 hover:underline">
          Volver a la página principal
        </Link>
      </div>
    </div>
  );
}
