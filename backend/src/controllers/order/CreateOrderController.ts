import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";

class CreateOrderController{
    async handle(req: Request, res: Response) {
        const { table, name } = req.body;

        const CreateOrder = new CreateOrderService();

        const order = await CreateOrder.execute({ table: parseInt(table), name});

        return res.status(201).json(order);
    }
};

export { CreateOrderController };