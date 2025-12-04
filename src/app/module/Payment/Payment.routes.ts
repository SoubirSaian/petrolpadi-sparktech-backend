import express from "express";
import { createPayment, verifyPaymentController, refundController } from "./Payment.controller";
import { verifyPaystackWebhook } from "../../middlewares/verifyPaystackWebhook";
import { paystackWebhookHandler } from "./webhook.controller";

const paymentRouter = express.Router();

paymentRouter.post("/initialize", createPayment);
paymentRouter.get("/verify/:reference", verifyPaymentController);
paymentRouter.post("/refund", refundController);

//webhook
// RAW BODY MIDDLEWARE
// router.use(express.raw({ type: "*/*" }));
paymentRouter.post("/webhook-v1-9e8f0soubir2025",
        express.raw({type: "*/*"}),
        verifyPaystackWebhook, 
        paystackWebhookHandler
);

export default paymentRouter;
