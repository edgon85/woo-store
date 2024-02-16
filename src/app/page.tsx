import { BannerDesktop, BannerMovil } from '@/components';

export default function Home() {
  return (
    <main>
      {/* Mostrar BannerDesktop en dispositivos grandes (mayores o iguales a md) */}
      <div className="hidden md:block">
        <BannerDesktop />
      </div>

      {/* Mostrar BannerMovil en dispositivos pequeños (menores a md) */}
      <div className="md:hidden">
        <BannerMovil />
      </div>
    </main>
  );
}
