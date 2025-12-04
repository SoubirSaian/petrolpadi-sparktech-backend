import { Request, Response } from "express";
import { initializePayment, verifyPayment, refundPayment } from "../../../helper/paystackHelper";
import PaymentModel from "./Payment.model";
import ApiError from "../../../error/ApiError";
import { ENUM_PAYMENT_STATUS } from "../../../utilities/enum";

//initialize/create payment
export const createPayment = async (req: Request, res: Response) => {
  try {
    const { email, amount, metadata, profileId,orderId } = req.body;

    const result = await initializePayment(email, amount, metadata);
    console.log("create payment data ======:",result);

    //create a new payment
    const payment = await PaymentModel.create({
        customerId: profileId,
        orderId,
        amount,
        reference: result.data.reference,
        metadata,
        status: ENUM_PAYMENT_STATUS.PENDING,
    });
    console.log("new payment ==== : ",payment);

    //also add payment reference in the order
    // add payment status in order

    if(!payment){
        throw new ApiError(500,"Failed to create new payment");
    }

    return res.status(200).json({
      status: "success",
      message: "Payment initialized successfully.",
      data: result,
    });

  } catch (error: any) {
    console.log("Failed to initialized payment.");
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

//verify payment controller
export const verifyPaymentController = async (req: Request, res: Response) => {
  try {

    const { reference } = req.params;

    const paystackData = await verifyPayment(reference);
    console.log("verify payment data ==== : ", paystackData);

    //update payment data
    const payment = await PaymentModel.findOneAndUpdate(
        { reference: reference },
        {
        status: paystackData.status === "success" ? ENUM_PAYMENT_STATUS.SUCCESS : ENUM_PAYMENT_STATUS.FAILED,
        channel: paystackData.channel,
        transactionId: paystackData.id,
        paidAt: paystackData.paid_at,
        metadata: paystackData.metadata,
        },
        { new: true }
    );
    console.log("Updated payment after verification === : ",payment);

    if(!payment){
        throw new ApiError(500,"Failed to update payment data after paystack verification")
    }
    return res.status(200).json({

      status: "success",
      message: "Payment verified successfully.",
      data: paystackData,
    });
  } catch (error: any) {

    console.log("Failed to verify payment.");
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

//refund payment controller
export const refundController = async (req: Request, res: Response) => {
  try {

    const { reference, amount } = req.body;

    const result = await refundPayment(reference, amount);
    console.log("Payment refunded ==== : ",result);

    //update payment data
    const payment = await PaymentModel.findOneAndUpdate(
        { reference: reference },
        { status: ENUM_PAYMENT_STATUS.REFUNDED },
        { new: true }
    );
    console.log("after successfull refund payment data ====: ",payment);

    //update payment status in the order model

    // if(!payment){
    //     throw new ApiError(500,"Failed to refund payment")
    // }

    return res.status(200).json({

      status: "success",
      message: "Payment refunded successfully.",
      data: result,
    });

  } catch (error: any) {

    console.log("Failed to refund payment.");
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
