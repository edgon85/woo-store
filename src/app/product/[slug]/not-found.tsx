export default function NotFound() {
  return (
    <div className="w-full mt-10 md:mt-10 flex flex-col justify-center items-center">
      <picture>
        <img
          src="/blank_canvas.svg"
          alt="Imagen de no hay productos disponibles"
          className="max-w-80"
        />
      </picture>
      <p className="text-lg">Producto no disponible</p>
    </div>
  );
}
