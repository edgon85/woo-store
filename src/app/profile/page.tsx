import { HeaderProfile, ProductCard, Tabs } from '@/components';

export default function ProfilePage() {
  return (
    <main className="px-4 lg:px-0 main-wrapper pt-4 pb-4">
      <HeaderProfile />
      <section className="mt-4">
        <Tabs />
      </section>
      <section className="mt-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <ProductCard
            imageUrl="https://via.placeholder.com/150"
            name="Producto 1"
            price="$19.99"
            description="Descripción del producto aquí..."
          />
          <ProductCard
            imageUrl="https://via.placeholder.com/150"
            name="Producto 1"
            price="$19.99"
            description="Descripción del producto aquí..."
          />
          <ProductCard
            imageUrl="https://via.placeholder.com/150"
            name="Producto 1"
            price="$19.99"
            description="Descripción del producto aquí..."
          />
          <ProductCard
            imageUrl="https://via.placeholder.com/150"
            name="Producto 1"
            price="$19.99"
            description="Descripción del producto aquí..."
          />
          <ProductCard
            imageUrl="https://via.placeholder.com/150"
            name="Producto 1"
            price="$19.99"
            description="Descripción del producto aquí..."
          />
          <ProductCard
            imageUrl="https://via.placeholder.com/150"
            name="Producto 1"
            price="$19.99"
            description="Descripción del producto aquí..."
          />
          <ProductCard
            imageUrl="https://via.placeholder.com/150"
            name="Producto 1"
            price="$19.99"
            description="Descripción del producto aquí..."
          />
        </div>
      </section>
    </main>
  );
}
