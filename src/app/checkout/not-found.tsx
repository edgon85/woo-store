import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="w-full mt-10 md:mt-10 flex flex-col justify-center items-center">
      <Image
        src="/blank_canvas.svg"
        alt="Imagen de no hay productos disponibles"
        className="max-w-80"
        width={400}
        height={400}
      />

      <p className="text-lg">Página no encontrada</p>
    </div>
  );
}
