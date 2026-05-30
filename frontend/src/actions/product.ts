"use server";

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";



export async function createProductAction(formData: FormData) {
    try {
        const token = await getToken();

        if (!token) {
            return { success: false, error: "Erro ao criar produto" };
        }

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData,
        });

        revalidatePath("/dashboard/products");

        return { success: true, error: "" };
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }

        return { success: false, error: "Erro ao criar produto" };
    }
}

export async function deleteProductAction(productId: string) {
    try {
        if(!productId) {
            return { success: false, error: "Erro ao deleta o produto"}
        }

        const token = await getToken();

        if(!token) {
            return { success: false, error: "Erro ao deleta o produto"}
        }

        await apiClient(`/product?product_id=${productId}`, {
            method: "DELETE",
            token,
        });

        revalidatePath("/dashboard/products");

        return { success: true, error: ""}

    }catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }

        return { success: false, error: "Erro ao deleta o produto" };
    }
}


