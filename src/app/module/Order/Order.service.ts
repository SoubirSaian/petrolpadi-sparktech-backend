
        import ApiError from "../../../error/ApiError";
        import { IOrder } from "./Order.interface";
        import OrderModel from "./Order.model";

        const updateUserProfile = async (id: string, payload: Partial<IOrder>) => {
            if (payload.email || payload.username) {
                throw new ApiError(400, "You cannot change the email or username");
            }
            const user = await OrderModel.findById(id);
            if (!user) {
                throw new ApiError(404, "Profile not found");
            }
            return await OrderModel.findByIdAndUpdate(id, payload, {
                new: true,
                runValidators: true,
            });
        };

        const OrderServices = { updateUserProfile };
        export default OrderServices;