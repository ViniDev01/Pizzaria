"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { deleteProductAction } from "@/actions/product";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface DeleteProductProps{
    productId: string;
}

export function ButtonDeleteProduct({ productId }: DeleteProductProps){

    const router = useRouter();

    async function handleDeleteProduct() {
        const result = await deleteProductAction(productId);

        if(result.success) {
            router.refresh();
            toast.success("Produto deletado com sucesso");
            return;
        }

        if(result.error !== "") {
            toast.error("Erro ao deleta o produto");
            return;
        }
    }
    return(
        <Button onClick={handleDeleteProduct} variant="destructive" className="bg-brand-primary hover:bg-brand-primary">
            <Trash className="text-white w-5 h-5" />
        </Button>
    )
}