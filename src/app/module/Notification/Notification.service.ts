
        import ApiError from "../../../error/ApiError";
        import { INotification } from "./Notification.interface";
        import NotificationModel from "./Notification.model";

        const updateUserProfile = async (id: string, payload: Partial<INotification>) => {
            if (payload.email || payload.username) {
                throw new ApiError(400, "You cannot change the email or username");
            }
            const user = await NotificationModel.findById(id);
            if (!user) {
                throw new ApiError(404, "Profile not found");
            }
            return await NotificationModel.findByIdAndUpdate(id, payload, {
                new: true,
                runValidators: true,
            });
        };

        const NotificationServices = { updateUserProfile };
        export default NotificationServices;