import { Request, Response } from "express";
import { DeleteProductService } from "../../services/product/DeleteProductService";

class DeleteProductController{
    async handle(req: Request, res: Response) {
        const product_id = req.query?.product_id as string;

        const deleteProductService = new DeleteProductService();

        const deleteProduct = await deleteProductService.execute({ product_id: product_id });

        return res.status(200).json(deleteProduct);

    }
}

export { DeleteProductController };