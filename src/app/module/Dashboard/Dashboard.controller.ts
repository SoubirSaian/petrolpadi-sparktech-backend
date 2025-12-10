import catchAsync from "../../../utilities/catchasync";
import sendResponse from "../../../utilities/sendResponse";
import DashboardService from "./Dashboard.service";


const adminRegister = catchAsync(
    async (req,res) => {
        const result = await DashboardService.registerAdminService(req.body);

        sendResponse(res,{
            statusCode: 201,
            success: true,
            message: "New admin created",
            data: result
        });
    }
);

const adminLogin = catchAsync(
    async (req,res) => {
        const result = await DashboardService.loginAdminService(req.body);

        sendResponse(res,{
            statusCode: 200,
            success: true,
            message: "Admin logged in successfully.",
            data: result
        });
    }
);

const editAdminProfile = catchAsync(
    async (req,res) => {
        const result = await DashboardService.loginAdminService(req.body);

        sendResponse(res,{
            statusCode: 200,
            success: true,
            message: "Updated admin data successfully",
            data: result
        });
    }
);

const changeAdminPassword = catchAsync(
    async (req,res) => {
        const result = await DashboardService.loginAdminService(req.body);

        sendResponse(res,{
            statusCode: 200,
            success: true,
            message: "Admin password changed successfully",
            data: result
        });
    }
);

const deleteAdminAccount = catchAsync(
    async (req,res) => {
        const result = await DashboardService.loginAdminService(req.body);

        sendResponse(res,{
            statusCode: 200,
            success: true,
            message: "Admin deleted successfully.",
            data: result
        });
    }
);

const dashboardStat = catchAsync(
    async (req,res) => {
        const result = await DashboardService.loginAdminService(req.body);

        sendResponse(res,{
            statusCode: 201,
            success: true,
            message: "Got website stat",
            data: result
        });
    }
);

const blockAdmin = catchAsync(
    async (req,res) => {
        const result = await DashboardService.loginAdminService(req.body);

        sendResponse(res,{
            statusCode: 200,
            success: true,
            message: "Got website stat",
            data: result
        });
    }
);


const DashboardController = {
    adminRegister,
    adminLogin,
    editAdminProfile,
    changeAdminPassword,
    deleteAdminAccount,
    dashboardStat,
    blockAdmin
}

export default DashboardController;