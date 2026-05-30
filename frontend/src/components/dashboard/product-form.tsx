"use client";

import React, { useState } from "react";
import { Plus, Upload } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { createProductAction } from "@/actions/product";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/lib/types";
import Image from "next/image";

interface ProductFormProps {
    categories: Category[];
}

function priceToCents(value: FormDataEntryValue | null) {
    if (typeof value !== "string") {
        return "";
    }

    const normalizedValue = value.replace("R$", "").replace(",", ".").trim();
    const price = Number(normalizedValue);

    if (Number.isNaN(price)) {
        return "";
    }

    return Math.round(price * 100).toString();
}

export function ProductForm({ categories }: ProductFormProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [categoryId, setCategoryId] = useState("");
    const [priceValue, setPriceValue] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!categoryId) {
            toast.error("Selecione uma categoria");
            return;
        }

        if(!imageFile) {
            return;
        }

        const formData = new FormData();
        
        const formElement = e.currentTarget;

        const name = (formElement.elements.namedItem("name") as HTMLInputElement)?.value;
        const description = (formElement.elements.namedItem("description") as HTMLInputElement)?.value;
        const priceInCents = priceToCents(priceValue);

        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", priceInCents.toString());
        formData.append("category_id", categoryId);
        formData.append("file", imageFile);

        const result = await createProductAction(formData);

        if (result.success) {
            toast.success("Produto criado com sucesso");
            setCategoryId("");
            setOpen(false);
            router.refresh();
            return;
        }

        toast.error(result.error);
    }

    function formatedPrice(price: string) {
        const numbers = price.replace(/\D/g, "");

        if(!numbers) return "";

        const amount = parseInt(numbers) / 100;

        return amount.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
    }

    function handlePriceValue(e: React.ChangeEvent<HTMLInputElement>) {
        const formated = formatedPrice(e.target.value);
        setPriceValue(formated);
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];

        if(file) {
            if(file.size > 4 * 1024 * 1024){
                toast.error("Imagem de até 4mb");
                return;
            }

            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            }

            reader.readAsDataURL(file);
        }
    }

    function removeImage() {
        setImagePreview(null);
        setImageFile(null);
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="bg-brand-primary text-white hover:bg-brand-primary"
                    disabled={categories.length === 0}
                >
                    <Plus className="w-5 h-5" />
                    Novo produto
                </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto p-6 bg-app-card text-white sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Criar novo produto</DialogTitle>
                    <DialogDescription>Cadastrando novo produto...</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="product-name">Nome do produto</Label>
                        <Input
                            type="text"
                            id="product-name"
                            name="name"
                            required
                            placeholder="Digite o nome do produto..."
                            className="border-app-border bg-app-background text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="product-price">Preço</Label>
                        <Input
                            id="product-price"
                            name="price"
                            required
                            placeholder="ex: R$35,00"
                            className="border-app-border bg-app-background text-white"
                            value={priceValue}
                            onChange={handlePriceValue}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Categoria</Label>
                        <Select value={categoryId} onValueChange={setCategoryId} required>
                            <SelectTrigger className="w-full border-app-border bg-app-background text-white">
                                <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                            <SelectContent className="bg-app-card text-white border-app-border">
                                {categories.map((category) => (
                                    <SelectItem 
                                        key={category.id} 
                                        value={category.id}
                                        className="cursor-pointer"
                                    >
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="product-description">Descrição</Label>
                        <Textarea
                            id="product-description"
                            name="description"
                            required
                            placeholder="Digite a descrição do produto..."
                            className="border-app-border bg-app-background text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="product-file">Imagem do produto</Label>
                        { imagePreview ? (
                            <div className="relative w-full h-48 border rounded-lg overflow-hidden">
                                <Image 
                                    src={imagePreview}
                                    alt="preview da imagem"
                                    fill
                                    className="object-cover z-10"
                                />

                                <Button
                                    type="button"
                                    variant={"destructive"}
                                    onClick={removeImage}
                                    className="absolute top-2 right-2 bg-brand-primary text-white z-20 hover:bg-brand-primary"
                                >
                                    Excluir
                                </Button>
                            </div>
                        ) : (
                            <div className="border-2 border-dashed rounded-md ">
                                <Label htmlFor="file" className="flex flex-col justify-center items-center cursor-pointer p-8">
                                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2"/>
                                    Clique para selecionar uma imagem
                                </Label>
                                <Input
                                    type="file"
                                    id="file"
                                    name="file"
                                    required
                                    accept="image/jpeg,image/jpg,image/png"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </div>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-brand-primary text-white hover:bg-brand-primary"
                    >
                        Criar produto
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
