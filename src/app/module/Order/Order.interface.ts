import { Types } from "mongoose";

export interface IOrder {
    customer: Types.ObjectId ;
    supplier: Types.ObjectId ;
    status : string;
    priceRate: number;
    quantity: number;
    totalPrice: number;
    address: string;
    latitude: string;
    longitude: string;
}