import { Response, Request } from "express";
import { ListCategoryService } from "../../services/category/ListCategoryService";


class ListCategoryController {
    async handle(req: Request, res: Response) {
        const categoryService = new ListCategoryService();

        const categories = await categoryService.execute();

        return res.status(200).json(categories);
    }
}

export { ListCategoryController };
