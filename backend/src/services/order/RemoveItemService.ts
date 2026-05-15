import prismaClient from "../../prisma";

interface RemoveItem{
    item_id: string;
}

class RemoveItemService{
    async execute({ item_id }: RemoveItem){
        try {

            const itemExists = await prismaClient.item.findFirst({
                where: {
                    id: item_id
                }
            });

            if(!itemExists) {
                throw new Error("Item não encontrado");
            }

            await prismaClient.item.delete({
                where: {
                    id: item_id
                }
            });

            return { message: "Item removido com sucesso" };


        }catch(err) {
            console.log(err);
            throw new Error("Erro ao remover item da order");
        }
    }
}

export { RemoveItemService };