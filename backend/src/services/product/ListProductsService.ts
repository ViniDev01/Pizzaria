import prismaClient from "../../prisma";

interface ListProducts{
    disabled?: string;
}


class ListProductsService {
    async execute({disabled}: ListProducts) {

        try {
            const listProducts = await prismaClient.product.findMany({
                where: {
                    disabled: disabled === "true" ? true : false
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    banner: true,
                    category_id: true,
                    createdAt: true
                },
                orderBy: {
                    createdAt: "desc"
                }
            });

            return listProducts;

        }catch(error) {
            throw new Error("Erro ao buscar lista")
        }

        
    }
}

export { ListProductsService };