import { z } from "zod";

        export const updateOrderData = z.object({
            body: z.object({
                name: z.string().optional(),
                phone: z.string().optional(),
                address: z.string().optional(),
            }),
        });

        const OrderValidations = { updateOrderData };
        export default OrderValidations;