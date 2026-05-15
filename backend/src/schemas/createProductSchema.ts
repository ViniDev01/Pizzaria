

import { z } from 'zod';

const createProductSchema = z.object({
    body: z.object({
        name: z.string("O nome é obrigatório").min(3, "O nome deve conter pelo menos 3 caracteres").max(100, "O nome deve conter no máximo 100 caracteres."),
        description: z.string("A descrição é obrigatória").min(10, "A descrição deve conter pelo menos 10 caracteres").max(500, "A descrição deve conter no máximo 500 caracteres."),
        price: z.string().min(1, "O valor do produto é obrigatório").regex(/^\d+(\.\d{1,2})?$/),
        category_id: z.string("A categoria é obrigatória"),
    }),
});

const ListProductsSchema = z.object({
    query: z.object({
        disabled: z.enum(["true", "false"])
        .optional()
        .default("false")
        .transform((val) => val === "true")
    }).strict()
});

const ListProductByCategorySchema = z.object({
    query: z.object({
        category_id: z.string({ message: "O id da categoria é obrigatória"})
    })
})

export { createProductSchema, ListProductsSchema, ListProductByCategorySchema };