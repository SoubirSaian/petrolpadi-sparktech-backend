import express from "express";
        import auth from "../../middlewares/auth";
        import validateRequest from "../../middlewares/validateRequest";
        import OrderValidations from "./Order.validation";
        import OrderController from "./Order.controller";
        

        const router = express.Router();

        

        export const OrderRoutes = router;