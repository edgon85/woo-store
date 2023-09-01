import { HeaderProfile, Tabs } from '@/components';


export default async function ProfilePage() {
  
 

  return (
    <main className="px-4 lg:px-0 main-wrapper pt-4 pb-4">
      <HeaderProfile />
      <section className="mt-4">
        <Tabs />
      </section>
      <section className="mt-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          grid
        </div>
      </section>
    </main>
  );
}
