import { EmptyTransaction } from '@/components';

export default function UserRatingsPage() {
  return (
    <EmptyTransaction
      label="¡Aun no Favoritos!"
      subLabel="¡Tus productos favoritos se mostraran aquí ."
      path="/products/create"
      btnText="Subir prenda"
      btnShow={false}
    />
  );
}
