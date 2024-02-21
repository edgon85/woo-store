import { getFeaturedProducts } from '@/actions';
import { BannerDesktop, BannerMovil, FeaturedArticles } from '@/components';

export default async function Home() {
  // const currentUserId = cookies().get('userId')?.value;
  const { data } = await getFeaturedProducts({});

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

      <article className="main-wrapper">
        <FeaturedArticles products={data.products} />
      </article>
    </main>
  );
}
