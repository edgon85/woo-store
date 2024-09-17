import { BuildIcon, CashIcon, EarthIcon, RecycleIcon } from '@/components';

export default function AboutPage() {
  return (
    <div className="main-wrapper min-h-screen px-4 md:px-0">
      <header className="py-6">
        <h1 className="text-3xl font-bold text-gray-900">Quiénes Somos</h1>
      </header>
      <main>
        <div className="py-6">
          {/* Introducción */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Nuestra Historia
            </h2>
            <p className="text-gray-700">
              Fundada en 2024, nuestra plataforma nació con la visión de
              revolucionar la forma en que compramos y vendemos moda. Inspirados
              por la creciente conciencia sobre el consumo sostenible, creamos
              un espacio donde la moda de segunda mano no solo es accesible,
              sino también emocionante y moderna.
            </p>
          </section>

          {/* Misión */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Nuestra Misión
            </h2>
            <p className="text-gray-700">
              Nuestra misión es fomentar un ciclo de moda más sostenible,
              conectando a personas que quieren dar una segunda vida a sus
              prendas con aquellos que buscan estilos únicos a precios
              accesibles. Creemos en el poder de la moda circular para reducir
              el impacto ambiental y promover un consumo más consciente.
            </p>
          </section>

          {/* Valores */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Nuestros Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ValueCard
                icon={<EarthIcon className="h-8 w-8 text-red-500" />}
                title="Sostenibilidad"
                description="Promovemos la reutilización y el consumo responsable para cuidar nuestro planeta."
              />
              <ValueCard
                icon={<RecycleIcon className="h-8 w-8 text-green-500" />}
                title="Economía Circular"
                description="Fomentamos un ciclo de vida más largo para la ropa, reduciendo el desperdicio."
              />
              <ValueCard
                icon={<CashIcon className="h-8 w-8 text-blue-500" />}
                title="Accesibilidad"
                description="Ofrecemos moda de calidad a precios accesibles para todos."
              />
              <ValueCard
                icon={<BuildIcon className="h-8 w-8 text-purple-500" />}
                title="Comunidad"
                description="Construimos una comunidad de amantes de la moda consciente y sostenible."
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

type Props = {
  icon: JSX.Element;
  title: string;
  description: string;
};

const ValueCard = ({ icon, title, description }: Props) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-center mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);
