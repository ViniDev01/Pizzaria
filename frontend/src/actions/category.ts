"use server";

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createCategoryAction(
    formData: FormData
) {
    try {
        const name = formData.get("name");
        const token = await getToken();

        if(!token) {
            return { success: false, error: "Erro ao criar categoria"}
        }

        await apiClient("/category", {
            method: "POST",
            token: token,
            body: JSON.stringify({ name: name })
        });

        revalidatePath("/dashboard/categories");

        return { success: true, error: ""};
    }catch(error) {
        console.log(error);
        if(error instanceof Error) {
            return { success: false, error: error.message }
        }

        return { success: false, error: "Erro ao criar categoria" }
    }
    
}