import { getFeaturedProducts } from '@/actions';
import {
  Banner,
  CategoryGrid,
  FeaturedArticles,
  MenWomanExclusive,
} from '@/components';
import NotFound from './not-found';

export default async function Home() {
  const { data, ok } = await getFeaturedProducts({});

  if (!ok) {
    NotFound();
  }

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
