import { Request, Response } from "express";
import { ListOrdersService } from "../../services/order/ListOrdersService";


class ListOrdersController{
    async handle(req: Request, res: Response){
        const draft = req.query?.draft as string;

        const listOrder = new ListOrdersService();

        const orders = await listOrder.execute({ draft: draft });

        return res.status(200).json(orders);
    }
}

export { ListOrdersController };