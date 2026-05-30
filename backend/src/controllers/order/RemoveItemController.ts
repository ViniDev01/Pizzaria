import { Request, Response } from "express";
import { RemoveItemService } from "../../services/order/RemoveItemService";


class RemoveItemController{
    async handle(req: Request, res: Response) {
        const {item_id} = req.query;

        const removeItem = new RemoveItemService();
        
        const item = await removeItem.execute({ item_id: item_id as string });

        return res.status(200).json(item);
    }
}

export { RemoveItemController };