type Props = {
  message: string;
};

export default function NotFound({ message = 'usuario no encontrado' }: Props) {
  return (
    <div className="w-full mt-10 md:mt-10 flex flex-col justify-center items-center">
      <picture>
        <img src="/svgs/void-user.svg" alt={message} className="max-w-80" />
      </picture>
      <p className="text-lg">{message}</p>
    </div>
  );
}
