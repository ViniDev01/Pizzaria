import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";


class CreateProductController {
    async handle(req: Request, res: Response) {
        const { name, description, price, category_id } = req.body;

        if(!req.file) {
            throw new Error("A imagem do produto é obrigatória");
        }

        const ProductService = new CreateProductService();

        const product = await ProductService.execute({
            name: name,
            description: description,
            price: parseInt(price),
            category_id: category_id,
            imageBuffer: req.file.buffer,
            imageName: req.file.originalname
        });

        return res.status(201).json(product);
    }
}


export { CreateProductController };


