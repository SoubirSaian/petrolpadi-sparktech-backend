import { model, Schema,models } from "mongoose";
import { IOrder } from "./Order.interface";
import { ENUM_ORDER_STATUS } from "../../../utilities/enum";

const OrderSchema = new Schema<IOrder>({
    customer: { type: Schema.Types.ObjectId, required: true, ref: "Customer" },
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier" },
    status: { type: String, enum: Object.values(ENUM_ORDER_STATUS),default: ENUM_ORDER_STATUS.PENDING },
    priceRate: { type: Number, required: true },
    quantity: { type: Number, required:true },
    totalPrice: { type: Number, required: true },
    address: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
}, { timestamps: true });

const OrderModel = models.Order || model<IOrder>("Order", OrderSchema);

export default OrderModel;