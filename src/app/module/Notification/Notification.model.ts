import { model, models, Schema } from "mongoose";
import { INotification } from "./Notification.interface";

const NotificationSchema = new Schema<INotification>({
    customer: { type: Schema.Types.ObjectId, required: true, ref: "Customer" },
    supplier: { type: Schema.Types.ObjectId, required: true, ref: "Supplier" },
    title: { type: String, required: true },
    details: { type: String, required: true },
}, { timestamps: true });

const NotificationModel = models.Notification || model<INotification>("Notification", NotificationSchema);

export default NotificationModel;