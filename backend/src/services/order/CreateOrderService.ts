import prismaClient from "../../prisma";

interface OrderRequestProps {
    table: number;
    name?: string;
}


class CreateOrderService{
    async execute({ table, name }: OrderRequestProps) {
        try {

            const createOrder = await prismaClient.order.create({
                data: {
                    table,
                    name: name ?? "",
                },
                select: {
                    id: true,
                    table: true,
                    status: true,
                    draft: true,
                    name: true,
                    items: true,
                    createdAt: true
                }
            });

            return createOrder;

        }catch(err) {
            console.log(err);
            throw new Error("Erro ao criar order");
        }
    }
}

export { CreateOrderService };