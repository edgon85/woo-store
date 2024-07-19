import { getFeaturedProducts } from '@/actions';
import { Banner, FeaturedArticles } from '@/components';

export default async function Home() {
  const { data } = await getFeaturedProducts({});

  return (
    <main>
      <Banner />
      <FeaturedArticles products={data.products} />
    </main>
  );
}
