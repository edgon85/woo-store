import { IUser } from './user.interface';

export interface IAddress {
  id?: string;
  fullName: string;
  streetAddress: string;
  phone: string;
  label: string | null;
  isPrimary?: boolean;
  user?: IUser;
  municipality: IMunicipality;
  department: IDepartment;
}

interface BaseEntity {
  id: string;
  name: string;
  slug: string;
}
// Department ahora extiende de BaseEntity
export interface IDepartment extends BaseEntity {
  municipalities?: IMunicipality[]; // Opcional, si necesitas la relación inversa
}

// Municipality también extiende de BaseEntity
export interface IMunicipality extends BaseEntity {
  department: IDepartment; // O simplemente el ID del departamento si prefieres
}
