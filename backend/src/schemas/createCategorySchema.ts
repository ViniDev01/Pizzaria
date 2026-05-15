import { z } from "zod";

const createCategorySchema = z.object({
    body: z.object({
        name: z.string({ message: "Categoria precisa ser um texto"}).min(2, { message: "Nome da categoria precisa ter no minimo 2 caracteres"})
    })
});

export { createCategorySchema };