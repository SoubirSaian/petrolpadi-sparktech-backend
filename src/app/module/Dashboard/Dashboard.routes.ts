import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { adminLoginValidation, createAdminvalidation } from "./Dashboard.validation";
import DashboardController from "./Dashboard.controller";



const dashboardRouter = express.Router();

dashboardRouter.post("/create-admin",
    // auth(["Super_Admin"]),
    validateRequest(createAdminvalidation),
    DashboardController.adminRegister
);

dashboardRouter.post("/login-admin",
    // auth(["Super_Admin"]),
    validateRequest(adminLoginValidation),
    DashboardController.adminLogin
);

dashboardRouter.patch("/edit-admin-profile",
    // auth(["Super_Admin"]),
    validateRequest(adminLoginValidation),
    DashboardController.editAdminProfile
);

dashboardRouter.patch("/change-admin-password",
    // auth(["Super_Admin"]),
    validateRequest(adminLoginValidation),
    DashboardController.changeAdminPassword
);

dashboardRouter.delete("/delete-admin",
    // auth(["Super_Admin"]),
    validateRequest(adminLoginValidation),
    DashboardController.deleteAdminAccount
);

dashboardRouter.post("/block-admin",
    // auth(["Super_Admin"]),
    validateRequest(adminLoginValidation),
    DashboardController.blockAdmin
);

dashboardRouter.get("/dashboard-stat",
    // auth(["Super_Admin"]),
    validateRequest(adminLoginValidation),
    DashboardController.dashboardStat
);



export default dashboardRouter;