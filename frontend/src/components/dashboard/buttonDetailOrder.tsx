"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import { Order } from "@/lib/types";
import { formatPrice, calcularOrderTotal } from "@/lib/utils";
import React from "react";
import toast from "react-hot-toast";
import { finishProductAction } from "@/actions/orders";

interface ButtonDetailOrderProps {
    order: Order | null;

}

export function ButtonDetailOrder({ order }: ButtonDetailOrderProps) {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);

    if(!order) {
        return null;
    }

    async function handleFinishOrder(orderId: string) {
        const result = await finishProductAction(orderId);

        if(result.success) {
            router.refresh();
            setOpen(false);
            toast.success("Order finalizada");
            return;
        }

        if(result.error !== "") {
            toast.error(result.error);
            return;
        }
    }
    return (
        <Dialog>
            <DialogContent showCloseButton={false} className="max-h-[90vh] overflow-y-auto scrollbar-none border-app-border bg-app-card p-0 text-white sm:max-w-2xl">
                <DialogHeader className="border-b border-app-border px-5 py-4">
                    <DialogTitle className="text-xl font-bold text-white">
                        Detalhe do pedido
                    </DialogTitle>
                </DialogHeader>

                <div className="px-5 pb-5">
                    { order && (
                        <div className="space-y-5">
                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="rounded-lg border border-app-border bg-app-card p-4">
                                    <p>Número da mesa</p>
                                    <p className="mt-1 text-2xl font-bold text-brand-primary">{order.table}</p>
                                </div>
                                <div className="rounded-lg border border-app-border bg-app-card p-4">
                                    <p>Cliente</p>
                                    <p className="mt-1 text-lg font-semibold">{order.name}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between rounded-lg border border-app-border bg-app-card p-4">
                                <p className="text-sm text-gray-400">Status</p>
                                <Badge variant="secondary" className="text-xs select-none">
                                    {order.status ? "Finalizado" : "Em produção"}
                                </Badge>
                            </div>
                            <div className="space-y-3">
                                <p className="font-semibold">Itens do pedido</p>
                                <div className="space-y-3">
                                    {order.items.map( item => (
                                        <div key={item.id} className="rounded-lg border border-app-border bg-app-card p-4">
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <p className="font-semibold">{item.product.name}</p>
                                                    <p className="mt-1 text-sm text-gray-400">Quantidade: {item.amount}</p>
                                                </div>
                                                <p className="text-sm font-medium text-gray-300">{formatPrice(item.product.price)}</p>
                                            </div>
                                            <div className="mt-3 flex justify-between border-t border-app-border pt-3 text-sm">
                                                <span className="text-gray-400">Subtotal</span>
                                                <span className="font-semibold text-white">{formatPrice(item.product.price * item.amount)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between rounded-lg border border-brand-primary/40 bg-brand-primary/10 p-4">
                                <span className="font-semibold">Total</span>
                                <span className="text-xl font-bold text-brand-primary">{formatPrice(calcularOrderTotal(order))}</span>
                            </div>

                            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <DialogClose asChild>
                                    <Button type="button" variant="outline" className="border-app-border bg-transparent text-white hover:bg-transparent hover:text-white">
                                        Fechar
                                    </Button>
                                </DialogClose>
                                <Button 
                                    type="button" 
                                    className="bg-brand-primary text-white hover:bg-brand-primary"
                                    onClick={() => handleFinishOrder(order.id)}   
                                >
                                    Finalizar Pedido
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}