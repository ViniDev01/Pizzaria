import { Request, Response } from "express";
import { AddItemService } from "../../services/order/AddItemService";


class AddItemController{
    async handle(req: Request, res: Response){
        const {amount, order_id, product_id} = req.body;

        

        const addItem = new AddItemService();

        const item = await addItem.execute({ amount: Number(amount), order_id: order_id, product_id: product_id });

        return res.status(201).json(item);
    }
};

export { AddItemController };