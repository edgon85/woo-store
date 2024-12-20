import { IDepartment } from '@/interfaces';
import { useCreateProductStore, useModalStore } from '@/stores';
import { ItemCreate } from '../ItemCreate';
import { DepartmentState } from './DepartmentState';
import { MapIcon } from '@/components/ui';

type Props = {
  departments: IDepartment[];
};

export const DepartmentSection = ({ departments }: Props) => {
  const department = useCreateProductStore((state) => state.department);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <ItemCreate
      title="Departamento"
      subtitle="Departamento donde se encuentra su producto"
      icon={<MapIcon />}
      value={department?.name!}
      onClick={() =>
        openModal(
          <DepartmentState departmentList={departments} />,
          'Departamentos disponibles'
        )
      }
    />
  );
};
