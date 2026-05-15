import prismaClient from "../../prisma";

interface DetailOrderServiceProps {
    order_id: string;
}

class DetailOrderService{
    async execute({ order_id }: DetailOrderServiceProps) {
        try {
            const order = await prismaClient.order.findFirst({
                where: {
                    id: order_id
                }
            });

            if(!order) {
                throw new Error("Detalhes do pedido não encontrado");
            }

            const listOrder = await prismaClient.order.findFirst({
                where: {
                    id: order_id
                },
                select: {
                    id: true,
                    table: true,
                    status: true,
                    draft: true,
                    name: true,
                    createdAt: true,
                    items: {
                        select: {
                            id: true,
                            amount: true,
                            createdAt: true,
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    description: true,
                                    price: true,
                                    banner: true
                                }
                            }
                        }
                    }
                }
            });

            return listOrder;

        }catch(err) {
            console.log(err);
            throw new Error("Erro ao buscar order");
        }
    }
};

export { DetailOrderService };