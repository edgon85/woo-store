import { Button } from '@/components/ui';
import { IProduct, IUser } from '@/interfaces';
import { useRouter } from 'next/navigation';

export const ActionButton = ({
  user,
  productUser,
  product,
}: {
  user: IUser | null;
  productUser: IUser | null;
  product: IProduct;
}) => {
  const router = useRouter();
  let label = 'Editar';

  if (user === null || user?.id !== productUser?.id) {
    label = 'Comprar';
  }

  const onHandleClick = () => {
    user?.id !== productUser?.id
      ? router.push(`/checkout/address/${product.id}`)
      : router.push(`/product/edit/${product.id}`);
  };

  return (
    <div className="mt-2">
      <Button
        onClick={onHandleClick}
        label={label}
        type="button"
        outlined={label === 'Editar'}
      />
    </div>
  );
};
