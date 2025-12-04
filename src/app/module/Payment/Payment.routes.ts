import express from "express";
import { createPayment, verifyPaymentController, refundController } from "./Payment.controller";
import { verifyPaystackWebhook } from "../../middlewares/verifyPaystackWebhook";
import { paystackWebhookHandler } from "./webhook.controller";

const paymentRouter = express.Router();
const webhookRouter = express.Router();

paymentRouter.post("/initialize-payment", 
        createPayment
);

paymentRouter.get("/verify-payment/:reference", verifyPaymentController);
paymentRouter.post("/refund-payment", refundController);


//webhook
// RAW BODY MIDDLEWARE
// router.use(express.raw({ type: "*/*" }));
webhookRouter.post("/webhook-v1-9e8f0soubir2025",
        express.raw({type: "*/*"}),
        verifyPaystackWebhook, 
        paystackWebhookHandler
);

export {paymentRouter,webhookRouter};
