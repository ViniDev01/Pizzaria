import { z } from "zod";

const createUserSchema = z.object({
    body: z.object({
        name: z
            .string()
            .min(3, "O nome deve conter pelo menos 3 caracteres")
            .max(50, "O nome deve conter no máximo 50 caracteres."),
        email: z.email("O email deve ser válido."),
        password: z
        .string()
        .min(6, "A senha deve conter pelo menos 6 caracteres.")
        .max(100, "A senha deve conter no máximo 100 caracteres."),
    }),
});

const authUserSchema = z.object({
    body: z.object({
        email: z.email("O email deve ser válido."),
        password: z.string("Senha obrigatorio.")
    })
})

export { createUserSchema, authUserSchema };