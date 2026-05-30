"use client";

import React, { useState, useActionState, useEffect } from "react";
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { createCategoryAction } from "@/actions/category";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function CategoryForm() {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const result = await createCategoryAction(formData);

        if(result.success) {
            toast.success("Categoria criada com sucesso");
            setOpen(false);
            router.refresh();
            return;
        }else {
            toast.error(result.error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-brand-primary text-white hover:bg-brand-primary">
                    <Plus className="w-5 h-5" />
                    Nova categoria
                </Button>
            </DialogTrigger>

            <DialogContent className="p-6 bg-app-card text-white" >
                <DialogHeader>
                    <DialogTitle>Criar nova categoria</DialogTitle>
                    <DialogDescription>Criando nova categoria...</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="categoria">Nome da categoria</Label>
                        <Input 
                            type="text"
                            id="categoria"
                            name="name"
                            required
                            placeholder="Digite o nome da categoria..."
                            className="border-app-border bg-app-background text-white"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-brand-primary text-white hover:bg-brand-primary"
                    >
                        Criar categoria
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

