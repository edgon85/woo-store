import { CreateProduct, MainModal } from '@/components';

const CreateNewProduct = () => {
  return (
    <div className="main-wrapper border flex justify-center border-red-100 pt-8 pb-8">
      <CreateProduct />
     
      {<MainModal
        modalId='addProd'
        body={<>Aquí va el body</>} />}
    </div>
  );
};

export default CreateNewProduct;
