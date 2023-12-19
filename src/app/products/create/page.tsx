import { fetchPackageDeliveries } from '@/actions';
import { CreateProduct } from '@/components';
import { IPackageDelivery } from '@/lib';

/* const CreateNewProduct = () => {

  const 

  return (
    <div className="main-wrapper border flex justify-center border-red-100 pt-8 pb-8">
      <CreateProduct />
    </div>
  );
};

export default CreateNewProduct; */

export default async function CreateProductPage() {
  const packageDeliveriesData =
    (await fetchPackageDeliveries()) as IPackageDelivery[];

  return (
    <div className="main-wrapper border flex justify-center border-red-100 pt-8 pb-8">
      <CreateProduct packageDeliveriesData={packageDeliveriesData} />
    </div>
  );
}
