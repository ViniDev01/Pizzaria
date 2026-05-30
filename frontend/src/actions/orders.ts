"use server"

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function finishOrderAction(orderId: string) {
    if(!orderId) {
        return { success: false, error: "Erro ao finalizar order"}
    }

    try {
        const token = await getToken();

        if(!token) {
            return { success: false, error: "Erro ao finalizar order"}
        }

        await apiClient("/order/finish", {
            method: "PUT",
            token: token,
            body: JSON.stringify({ order_id: orderId }),
        });

        revalidatePath("/dashboard");

        return { success: true, error: ""}
    }catch(err) {
        console.log(err);
        if(err instanceof Error) {
            return { success: false, error: err.message}
        }

        return { success: false, error: "Erro ao finalizar order"}
    }
}