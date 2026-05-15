import prismaClient from "../../prisma";

class ListCategoryService {
    async execute() {
        try {
            const categories = await prismaClient.category.findMany({
                select: {
                    id: true,
                    name: true,
                    createdAt: true,
                    updatedAt: true,
                }
            });

            return categories;
            
        } catch (err) {
            throw new Error("Erro ao listar categorias.")
        }
    }
}

export { ListCategoryService };
