import {
  CameraIcon,
  CreditCard,
  PackageIcon,
  SearchIcon,
  TruckIcon,
  UploadIcon,
} from '@/components';
import Link from 'next/link';

export default function HowItWorksPage() {
  return (
    <div className="main-wrapper py-12">
      <div className="">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Cómo Funciona
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Sección Vende */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Vende</h3>
            <ul className="space-y-6">
              <Step
                icon={<CameraIcon className="text-indigo-600" />}
                title="Fotografía tus prendas"
                description="Toma fotos claras y atractivas de los artículos que quieres vender."
              />
              <Step
                icon={<UploadIcon className="text-indigo-600" />}
                title="Sube y describe"
                description="Crea un anuncio detallando el estado, marca y precio de tu prenda."
              />
              <Step
                icon={<PackageIcon className=" text-indigo-600" />}
                title="Empaca y envía"
                description="Cuando vendes un artículo, empácalo con cuidado y envíalo al comprador."
              />
            </ul>
            <Link
              href="/products/create"
              className="mt-6 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Empezar a vender
            </Link>
          </div>

          {/* Sección Compra */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Compra</h3>
            <ul className="space-y-6">
              <Step
                icon={<SearchIcon className="text-cerise-red-500" />}
                title="Explora el catálogo"
                description="Navega por miles de prendas de segunda mano y encuentra tu estilo."
              />
              <Step
                icon={<CreditCard className="text-cerise-red-500" />}
                title="Compra seguro"
                description="Elige tu artículo y paga de forma segura a través de nuestra plataforma."
              />
              <Step
                icon={<TruckIcon className="text-cerise-red-500" />}
                title="Recibe tu compra"
                description="Espera la llegada de tu nueva adquisición y ¡disfrútala!"
              />
            </ul>
            <Link
              href="/catalog/ropa/mujer"
              className="mt-6 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cerise-red-600 hover:bg-cerise-red-500"
            >
              Empezar a comprar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  icon: JSX.Element;
  title: string;
  description: string;
};
const Step = ({ icon, title, description }: Props) => (
  <li className="flex items-start">
    <div className="flex-shrink-0">
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100">
        {icon}
      </div>
    </div>
    <div className="ml-4">
      <h4 className="text-lg font-medium text-gray-900">{title}</h4>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  </li>
);
