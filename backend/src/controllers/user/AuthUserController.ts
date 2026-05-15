
import { authUserService } from "../../services/user/AuthUserService";
import { Request, Response } from "express";


class authUserController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;
        const authUser = new authUserService();

        const result = await authUser.execute({ email, password });

        return res.json(result);
    }   
}

export { authUserController };