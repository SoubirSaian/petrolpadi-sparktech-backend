import NotificationModel from "../app/module/Notification/Notification.model";;
// import AdminNotificationModel from "../app/module/notification/AdminNotification.model.js";
import catchAsync from "./catchasync";
import ApiError from "../error/ApiError.js";
import { INotification } from "../app/module/Notification/Notification.interface";


const postNotification = catchAsync( 

    async (payload) => {

        //create a new notification
        await NotificationModel.create({...payload});
    }
);

export default postNotification;