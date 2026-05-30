"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/auth";
import Link from "next/link";
import toast from "react-hot-toast";

import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function LoginForm() {

    const [state, formAction, isPanding] = useActionState(loginAction, null);
    const router = useRouter();

    useEffect(() => {
        if(state?.success && state?.redirectTo) {
            router.push(state.redirectTo);
            toast.success("Conta acessada com sucesso.")
        }

        if(state?.error) {
            toast.error(state.error);
        }
    }, [state, router]);
    return (
        <Card className="bg-app-card border border-app-border max-w-md w-full mx-auto">
            <CardHeader>
                <CardTitle 
                    className="text-white text-center text-3xl sm:text-4xl font-bold"
                >
                    Sujeito
                    <span className="text-brand-primary">Pizza</span>
                </CardTitle>
                <CardDescription className="text-[#F0F4F8] text-center py-2">Preencha os dados para acessar sua conta</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Email</Label>
                        <Input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Digite seu email..."
                            required
                            className="text-white bg-app-card border border-app-border"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-white">Password</Label>
                        <Input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Digite seu password..."
                            required
                            className="text-white bg-app-card border border-app-border"
                        />
                    </div>
                    <Button type="submit" className="w-full bg-brand-primary cursor-pointer" disabled={isPanding}>
                        { isPanding ? "Acessando conta" : "Acessar"}
                    </Button>

                    <p className="text-center text-sm text-white">Ainda não possui uma conta? <Link href={"/register"} className="font-semibold text-brand-primary">Cria uma conta</Link></p>
                </form>
            </CardContent>
        </Card>
    )
}