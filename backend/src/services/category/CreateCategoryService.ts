import prismaClient from "../../prisma";

interface CategoryProps {
    name: string;
}

class CreateCategoryService {
    async execute({ name } : CategoryProps) {
        try {
            const category = await prismaClient.category.create({
                data: {
                    name: name
                },
                select: {
                    id: true,
                    name: true,
                    createdAt: true,
                }
            });

            return category;
            
        }catch (err) {
            throw new Error("Erro ao cria a categoria.")
        }
    }
}

export { CreateCategoryService}