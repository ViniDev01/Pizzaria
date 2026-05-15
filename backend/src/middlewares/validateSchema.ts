
import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";

const validateSchema = 
    (schema: ZodType) => async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            })

            return next();
        }catch (error) {
            if(error instanceof ZodError) {
                return res.status(400).json({
                    error: "Erro de validação",
                    details: error.issues.map((issue) => ({
                        fild: issue.path.slice(1).join("."),
                        message: issue.message
                    }))
                })
            }

            return res.status(500).json({
                error: "Erro interno do servidor",
            })
        }
}

export { validateSchema };