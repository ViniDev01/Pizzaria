import { z } from "zod";

const createOrderSchema = z.object({
    body: z.object({
        table: z.number({ message: "O numero da mesa é obrigatório" })
        .int({ message: "O número da mesa deve ser um número inteiro"})
        .positive({ message: "O número da mesa deve ser um número positivo" }),
        name: z.string({ message: "" }).min(1, { message: "" }).optional()
    })
});

const addItemSchema = z.object({
    body: z.object({
        order_id: z.string({ message: "Order deve ser uma string"}).min(1, { message: "O id da order é obrigatória"}),
        product_id: z.string({ message: "Produto deve ser uma string"}).min(1, { message: "O id do produto é obrigatório"}),
        amount: z.number({ message: "" }).int("Quantidade deve ser um número inteiro").positive("Quantidade deve ser um número positivo")
    })
});

const removeItemSchema = z.object({
    query: z.object({
        item_id: z.string({ message: "Order deve ser uma string"}).min(1, { message: "O id do item é obrigatório"}),
    })
});
const detailOrderSchema = z.object({
    query: z.object({
        order_id: z.string({ message: "Order deve ser uma string"}).min(1, { message: "O id da order é obrigatório"}),
    })
});

const sendOrderSchema = z.object({
    body: z.object({
        order_id: z.string({ message: "Order deve ser uma string"}).min(1, { message: "O id da order é obrigatório"}),
        name: z.string({ message: "Nome é obrigatório" }).min(2, { message: "Nome deve ter pelo menos 2 caracteres" })
    })
});

const finishOrderSchema = z.object({
    body: z.object({
        order_id: z.string({ message: "Order deve ser uma string"}).min(1, { message: "O id da order é obrigatório"}),
    })
});

const deleteOrderSchema = z.object({
    query: z.object({
        order_id: z.string({ message: "Order deve ser uma string"}).min(1, { message: "O id da order é obrigatório"}),
    })
});



export { createOrderSchema, addItemSchema, removeItemSchema, detailOrderSchema, sendOrderSchema, finishOrderSchema, deleteOrderSchema };