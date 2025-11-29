import { Types } from "mongoose";

export interface INotification {
    supplier : Types.ObjectId;
    customer :Types.ObjectId;
    title :string;
    details: string;  
}