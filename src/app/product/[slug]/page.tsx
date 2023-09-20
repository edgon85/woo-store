import {
  ProductDetail,
  ImageSlider,
  BtnActions,
  UserInfo,
  RelatedProducts,
} from '@/components';

const prodImages = [
  'https://res.cloudinary.com/dc2vkibqq/image/upload/v1673066597/c972ndpuv9rhzgtuwl0o.webp',
  'https://res.cloudinary.com/dc2vkibqq/image/upload/v1694979833/woo-products/i16n0hts782riztfhfww.jpg',
  'https://res.cloudinary.com/dc2vkibqq/image/upload/v1694979833/woo-products/wxhe9a4ltkwumchkrb7v.jpg',
  'https://res.cloudinary.com/dc2vkibqq/image/upload/v1694979833/woo-products/rlqrnb9ocnmexjkn8pne.jpg',
];

export default function ProductDetailPage() {
  return (
    <>
      <section className="main-wrapper flex flex-col sm:flex-row">
        {/* <!-- Contenido (Lado izquierdo en pantallas grandes) --> */}
        <div className="w-full lg:w-3/4 p-2 ">
          {/* <LightBoxGallery images={prodImages} /> */}
          <div className="container mx-auto ">
            <ImageSlider images={prodImages} />
            <BtnActions />
          </div>
        </div>

        {/* <!-- Aside (Lado derecho en pantallas grandes) --> */}
        <aside className="w-full lg:w-2/5 p-2">
          <ProductDetail />
          <div className="mt-4">
            <UserInfo />
          </div>
        </aside>
      </section>
      <section className="main-wrapper">
        <RelatedProducts />
      </section>
    </>
  );
}
