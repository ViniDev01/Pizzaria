import prismaClient from "../../prisma";
interface ListProductByCategoryServiceProps {
    category_id: string;
}

class ListProductByCategoryService{
    async execute({ category_id }: ListProductByCategoryServiceProps) {
        try {
            const categoryExists = await prismaClient.category.findFirst({
                where: {
                    id: category_id
                }
            });

            if(!categoryExists) {
                throw new Error("Categoria não encontrada");
            }

            const productByCategory = await prismaClient.product.findMany({
                where: {
                    category_id: category_id,
                    disabled: false,
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    banner: true,
                    disabled: true,
                    category_id: true,
                    createdAt: true,
                    category: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
                }
            });

            return productByCategory;

        }catch(err) {
            throw new Error("Erro ao buscaar produtos");
        }
    }
}

export { ListProductByCategoryService };