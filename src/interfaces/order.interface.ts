import { OrderStatus } from "@/enums";
import { IAddress, IPackageDelivery, IPaymentMethod, IProduct, IUser } from "./";
import { Summary } from "@/types";

export interface IOrder {
    id: string;
    product: IProduct;
    shippingAddress: IAddress;
    paymentMethod: IPaymentMethod;
    amount: number;
    orderStatus: OrderStatus;
    packageDelivery: IPackageDelivery;
    notes?: string;
    orderDate: string;
    buyer: IUser;
    seller: IUser;
    summary: Summary;
    claim: boolean;
    received: boolean;
    guideUrl: string; // Nuevo campo para almacenar la URL del PDF de la guía
  }