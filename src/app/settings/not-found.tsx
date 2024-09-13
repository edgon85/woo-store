export default function NotFound() {
  return (
    <div className="w-full mt-10 md:mt-10 flex flex-col justify-center items-center">
      <picture>
        <img
          src="/blank_canvas.svg"
          alt="Pagina no disponible"
          className="max-w-80"
        />
      </picture>
      <p className="text-lg">Pagina no disponible</p>
    </div>
  );
}
