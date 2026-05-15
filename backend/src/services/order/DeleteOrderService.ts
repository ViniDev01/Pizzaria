import prismaClient from "../../prisma";

interface DeleteOrderServiceProps {
    order_id: string;
}

class DeleteOrderService{
    async execute({ order_id }: DeleteOrderServiceProps) {
        try {

            const order = await prismaClient.order.findFirst({
                where: {
                    id: order_id
                }
            });

            if(!order) {
                throw new Error("Pedido não encontrado");
            }
            
            await prismaClient.order.delete({
                where: {
                    id: order_id
                }
            });

            return { message: "Pedido excluído com sucesso" };

        }catch(err) {
            console.log(err);
            throw new Error("Erro ao excluir order");
        }
    }
};

export { DeleteOrderService };