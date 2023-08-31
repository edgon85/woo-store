import { HeaderProfile, Tabs } from '@/components';

export default function WishList() {
  return (
    <main className="px-4 lg:px-0 main-wrapper pt-4 pb-4">
      <HeaderProfile />
      <section className="mt-4">
        <Tabs />
      </section>

      <section>
        <p>Favoritos</p>
      </section>
    </main>
  );
}
