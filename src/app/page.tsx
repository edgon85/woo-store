import { getFeaturedProducts } from '@/actions';
import {
  Banner,
  CategoryGrid,
  FeaturedArticles,
  MenWomanExclusive,
} from '@/components';

export default async function Home() {
  const { data } = await getFeaturedProducts({});

  return (
    <main>
      <Banner />
      <div className="hidden md:block my-4">
        <CategoryGrid />
      </div>
      <FeaturedArticles products={data.products} />
      <div className="block md:hidden">
        <CategoryGrid />
      </div>
      {/* <MenWomanExclusive /> */}
    </main>
  );
}
