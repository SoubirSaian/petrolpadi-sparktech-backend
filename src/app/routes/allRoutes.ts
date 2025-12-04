import { Router } from "express";
import authRouter from "../module/auth/auth.routes";
import {paymentRouter} from "../module/Payment/Payment.routes";

const allRouter = Router();


const moduleRoutes = [
    {
        path: '/auth',
        router: authRouter,
    },
    {
        path: '/paystack',
        router: paymentRouter,
    },
    
];

moduleRoutes.forEach((route) => allRouter.use(route.path, route.router));

export default allRouter;