"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { registerAction } from "@/actions/auth";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import toast from "react-hot-toast";

export function RegisterForm() {

    const [state, formAction, isPanding] = useActionState(registerAction, null);
    const router = useRouter();

    useEffect(() => {
        if(state?.success && state?.redirectTo) {
            router.push(state.redirectTo);
            toast.success("Conta criada com sucesso.")
        }

        if(state?.error) {
            toast.error(state.error);
        }
    }, [state, router]);

  return (
    <Card className="bg-app-card border border-app-border w-full max-w-md mx-auto">
        <CardHeader>
            <CardTitle 
                className="text-white text-center text-3xl sm:text-4xl font-bold"
            >
                Sujeito
                <span className="text-brand-primary">Pizza</span>
            </CardTitle>
            <CardDescription className="text-[#F0F4F8] text-center py-2">Preencha os dados para criar sua conta</CardDescription>
        </CardHeader>
        <CardContent>
            <form className="space-y-4" action={formAction}>
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Nome</Label>
                    <Input 
                        type="text" 
                        id="name" 
                        name="name"
                        placeholder="Digite seu nome" 
                        required 
                        minLength={3} 
                        className="text-white bg-app-card border border-app-border"    
                    />
                </div>
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
                    <Label htmlFor="password" className="text-white">Senha</Label>
                    <Input 
                        type="password" 
                        id="password" 
                        name="password"
                        placeholder="Digite sua senha..." 
                        required 
                        className="text-white bg-app-card border border-app-border"    
                    />
                </div>

                <Button type="submit" className="w-full bg-brand-primary text-white hover:bg-brand-primary">
                    { isPanding ? "Criando conta..." : "Criar conta"}
                </Button>

                <p className="text-center text-sm text-white">Já tem uma conta? <Link href={"/login"} className="font-semibold text-brand-primary">Faça o login</Link></p>
            </form>
            
        </CardContent>
    </Card>
  );
}