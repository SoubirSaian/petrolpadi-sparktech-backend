import catchAsync from "../../../utilities/catchasync";
import sendResponse from "../../../utilities/sendResponse";
import NotificationServices from "./Notification.service";

const updateUserProfile = catchAsync(async (req, res) => {
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Profile updated successfully",
        data: null,
    });
});

const NotificationController = { updateUserProfile };
export default NotificationController;