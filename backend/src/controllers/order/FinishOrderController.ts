import { Request, Response } from "express";
import { FinishOrderService } from "../../services/order/FinishOrderService";

class FinishOrderController{
    async handle(req: Request, res: Response){
        const { order_id } = req.body;

        const finishOrder = new FinishOrderService();

        const updatedOrder = await finishOrder.execute({ order_id: order_id as string });

        return res.status(200).json(updatedOrder);
    }
}

export { FinishOrderController };