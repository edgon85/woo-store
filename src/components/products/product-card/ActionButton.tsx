import { Button } from '@/components/ui';
import { useCheckout } from '@/hooks';
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
  const { onAddCheckoutProduct } = useCheckout();
  let label = 'Editar';

  if (user === null || user?.id !== productUser?.id) {
    label = 'Comprar';
  }

  const onHandleClick = () => {
    if (user?.id !== productUser?.id) {
      onAddCheckoutProduct(product);
      router.push(`/checkout?transaction=${product.id}`);
    } else {
      router.push(`/product/edit/${product.id}`);
    }

    /* user?.id !== productUser?.id
      ? router.push(`/checkout?transaction=${product.id}`)
      : router.push(`/product/edit/${product.id}`); */
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
