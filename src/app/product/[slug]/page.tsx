import { LightBoxGallery } from '@/components';
import { ImageSlider } from '@/components/ui/image-slider/ImageSlider';
const prodImages = [
  'https://res.cloudinary.com/dc2vkibqq/image/upload/v1673066597/c972ndpuv9rhzgtuwl0o.webp',
  'https://res.cloudinary.com/dc2vkibqq/image/upload/v1694979833/woo-products/i16n0hts782riztfhfww.jpg',
  'https://res.cloudinary.com/dc2vkibqq/image/upload/v1694979833/woo-products/wxhe9a4ltkwumchkrb7v.jpg',
  'https://res.cloudinary.com/dc2vkibqq/image/upload/v1694979833/woo-products/rlqrnb9ocnmexjkn8pne.jpg',
];
export default function ProductDetailPage() {
  return (
    <section className="main-wrapper flex flex-col sm:flex-row">
      {/* <!-- Contenido (Lado izquierdo en pantallas grandes) --> */}
      <div className="w-full lg:w-3/4 p-2 ">
        {/* <LightBoxGallery images={prodImages} /> */}
        <div className="container mx-auto p-4">
          <ImageSlider images={prodImages}/>
        </div>
      </div>

      {/* <!-- Aside (Lado derecho en pantallas grandes) --> */}
      <aside className="w-full lg:w-2/5 p-2">
        <h2 className="text-lg font-semibold">Aside</h2>
        <p>Este es el contenido del aside.</p>
      </aside>
    </section>
  );
}
