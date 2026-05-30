"use server"
import { apiClient } from "@/lib/api";
import { AuthResponse } from "@/lib/types"
import { removeToken, setToken } from "@/lib/auth";
import { redirect } from "next/navigation"

export async function registerAction(
    prevState: {success: boolean; error: string; redirectTo?: string} | null,
    formData: FormData
) {
    try{
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");

        const data = {
            name: name,
            email: email,
            password: password
        }
        await apiClient("/users", {
            method: "POST",
            body: JSON.stringify(data)
        });

        return { success: true, error: "", redirectTo: "/login"};

    }catch(error) {
        if(error instanceof Error) {
            return { success: false, error: error.message }
        }

        return { success: false, error: "Erro ao criar conta"}
    }
}

export async function loginAction(
    prevState: {success: boolean; error: string; redirectTo?: string} | null,
    formData: FormData
) {

    try{
        const email = formData.get("email");
        const password = formData.get("password");

        const data = {
            email: email,
            password: password
        }
        const response = await apiClient<AuthResponse>("/session", {
            method: "POST",
            body: JSON.stringify(data)
        });

        await setToken(response.token);


        return { success: true, error: "", redirectTo: "/dashboard"};
    }catch(error) {
        if(error instanceof Error) {
            return { success: false, error: error.message }
        }

        return { success: false, error: "Erro ao acessar conta" }
    }
}

export async function logoutAction() {
    await removeToken();
    redirect("/login")
}