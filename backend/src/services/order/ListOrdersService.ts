import prismaClient from "../../prisma";

interface ListOrdersServiceProps {
    draft?: string;
}

class ListOrdersService{
    async execute({ draft }: ListOrdersServiceProps) {
        try {
            const listOrder = await prismaClient.order.findMany({
                where: {
                    draft: draft === "true" ? true : false
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
                },
                orderBy: {
                    createdAt: "desc"
                }
            });

            return listOrder;

        }catch(err) {
            console.log(err);
            throw new Error("Erro ao buscar lista de order");
        }
    }
};

export { ListOrdersService };