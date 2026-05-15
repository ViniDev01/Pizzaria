import prismaClient from "../../prisma";

interface SendOrderServiceProps {
    order_id: string;
    name: string;
}

class SendOrderService{
    async execute({ order_id, name }: SendOrderServiceProps) {
        try {
            const order = await prismaClient.order.findFirst({
                where: {
                    id: order_id
                }
            });

            if(!order) {
                throw new Error("Pedido não encontrado");
            }
            
            const sendOrder = await prismaClient.order.update({
                where: {
                    id: order_id
                },
                data: {
                    name: name,
                    draft: false,
                },
                select: {
                    id: true,
                    table: true,
                    status: true,
                    draft: true,
                    name: true,
                    createdAt: true,
                }
            });

            return sendOrder;

        }catch(err) {
            console.log(err);
            throw new Error("Erro ao enviar order");
        }
    }
};

export { SendOrderService };