import { Response, Request } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";


class CreateCategoryController {
    async handle(req: Request, res: Response) {
        const { name } = req.body;

        const categoryService = new CreateCategoryService();

        const category = await categoryService.execute({ name })

        return res.status(201).json(category);
    }
}

export { CreateCategoryController };