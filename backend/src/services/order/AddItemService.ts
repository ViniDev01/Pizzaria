import prismaClient from "../../prisma";

interface AddItem{
    order_id: string;
    product_id: string;
    amount: number;
}

class AddItemService{
    async execute({ amount, order_id, product_id}: AddItem){
        try {
            const orderExists = await prismaClient.order.findFirst({
                where: {
                    id: order_id,
                    draft: true,
                }
            });

            if(!orderExists) {
                throw new Error("order não encontrado");
            }

            const productExists = await prismaClient.product.findFirst({
                where: {
                    id: product_id,
                    disabled: false,
                }
            });

            if(!productExists){
                throw new Error("Produto não encontrado");
            }

            const addItem = await prismaClient.item.create({
                data: {
                    amount: amount,
                    order_id: order_id,
                    product_id: product_id
                },
                select: {
                    id: true,
                    amount: true,
                    createdAt: true,
                    order_id: true,
                    product_id: true,
                    product: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            price: true,
                            banner: true,
                        }
                    }
                }
            });

            return addItem;
            
        }catch(err) {
            console.log(err);
            throw new Error("Erro ao Adicionar Item");
        }
    }
};

export { AddItemService };