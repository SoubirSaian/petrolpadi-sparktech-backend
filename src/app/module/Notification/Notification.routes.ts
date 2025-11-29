import express from "express";
        import auth from "../../middlewares/auth";
        import validateRequest from "../../middlewares/validateRequest";
        import NotificationValidations from "./Notification.validation";
        import NotificationController from "./Notification.controller";
        

        const router = express.Router();

        

        export const NotificationRoutes = router;