import Image from 'next/image';

export const RelatedProducts = () => {
  const products = [
    { id: 1, name: 'Producto 1', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Producto 2', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Producto 3', image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Producto 4', image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Producto 5', image: 'https://via.placeholder.com/150' },
    { id: 6, name: 'Producto 6', image: 'https://via.placeholder.com/150' },
  ];
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Productos Relacionados</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <RelatedProductsCard key={product.id} />
        ))}
      </div>
    </div>
  );
};

export const RelatedProductsCard = () => {
  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Imagen del producto */}
      <div className="relative h-48">
        <Image
          src="https://via.placeholder.com/300"
          alt="Nombre del producto"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: 'cover',
          }}
        />
      </div>

      {/* Descuento */}
      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold py-1 px-2 rounded">
        -30%
      </div>

      {/* Contenido */}
      <div className="p-4">
        {/* Precio y descuento */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">$120</span>
          <span className="text-sm text-gray-500 line-through">$200</span>
        </div>

        {/* Nombre del producto */}
        <h3 className="mt-2 text-sm text-gray-700 truncate">
          Nombre del producto
        </h3>
      </div>
    </div>
  );
};
