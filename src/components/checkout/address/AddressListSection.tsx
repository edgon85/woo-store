'use client';
import { useCallback, useEffect, useState } from 'react';
import { IAddress } from '@/interfaces';
import { useCheckoutStore } from '@/stores';
import { Divider, List, ListItem } from '@tremor/react';

import Modal from 'react-responsive-modal';
import { DeleteAddress } from './delete-address/DeleteAddress';
import { CreateFormAddress } from './CreateForm';
import { fetchShippingAddress, makeAddressPrimary } from '@/actions';
import { CirclePlus, EditIcon } from '@/components/ui';

export const AddressListSection = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [addressList, setAddressList] = useState<IAddress[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setAddress = useCheckoutStore((state) => state.setShippingAddress);
  const address = useCheckoutStore((state) => state.address);

  const fetchAddress = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await fetchShippingAddress();
      setAddressList(data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      fetchAddress();
    }
  }, [isModalOpen, fetchAddress]);

  const closeModal = useCallback(() => setModalOpen(false), []);

  const onSelectAddress = useCallback(
    async (selectedAddress: IAddress) => {
      setAddress(selectedAddress);
      await makeAddressPrimary(selectedAddress.id!);
      closeModal();
    },
    [setAddress, closeModal]
  );

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const onAddressCreated = useCallback(() => {
    fetchAddress();
  }, [fetchAddress]);

  const handleAddressDeleted = useCallback((deletedAddressId: string) => {
    setAddressList((prevList) =>
      prevList.filter((address) => address.id !== deletedAddressId)
    );
  }, []);

  return (
    <>
      <button onClick={openModal}>
        {address ? (
          <span className="flex items-center justify-center gap-2">
            Cambiar <EditIcon />
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Agregar <CirclePlus />
          </span>
        )}
      </button>
      <Modal onClose={closeModal} open={isModalOpen} center>
        <div className="min-w-96 p-4">
          <h2 className="text-xl mb-2">
            {addressList.length === 0
              ? 'Agregue una dirección'
              : 'Seleccione Dirección'}
          </h2>
          <div className="mx-auto max-w-md">
            <List>
              {addressList.map((address: IAddress) => (
                <ListItem key={address.id}>
                  <span className="">
                    {address.streetAddress}, {address.municipality.name},{' '}
                    {address.department.name}
                  </span>
                  <div className="flex gap-2">
                    <button
                      className="rounded border text-xs p-2 text-white bg-cerise-red-600 hover:bg-cerise-red-500"
                      onClick={() => onSelectAddress(address)}
                    >
                      seleccionar
                    </button>
                    <DeleteAddress
                      addressId={address.id!}
                      onAddressDeleted={handleAddressDeleted}
                    />
                  </div>
                </ListItem>
              ))}
            </List>
          </div>
          <Divider className=" bg-gray-400" />
          <CreateFormAddress
            closeModalParent={setModalOpen}
            onAddressCreated={onAddressCreated}
          />
        </div>
      </Modal>
    </>
  );
};
