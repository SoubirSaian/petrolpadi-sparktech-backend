import { Types } from "mongoose";

export interface IPayment extends Document {
  customerId?: Types.ObjectId;
  orderId?: Types.ObjectId;

  reference: string;
  provider: "paystack";

  amount: number;
  currency: string;

  status: string;

  channel?: string;        // card, bank, mobile_money, etc
  transactionId?: string;  // Paystack transaction id

  metadata?: any;

  paidAt?: Date;
  
//   createdAt: Date;
//   updatedAt: Date;
}

export interface IPaymentPayload {
  email: string;
  amount: number;
  metadata: {
    orderId: string;
    profileId: string;
    [key: string]: any;
  };
  // profileId: string;
  // orderId: string;
}
