import { Request, Response } from "express";
import { ListProductByCategoryService } from "../../services/product/ListProductByCategoryService";

class ListProductByCategoryController{
    async handle(req: Request, res: Response) {
        const category_id = req.query?.product_id as string;

        const ListProductByCategory = new ListProductByCategoryService();

        const products = await ListProductByCategory.execute({ category_id });

        return res.status(200).json(products);
    }
}

export { ListProductByCategoryController };