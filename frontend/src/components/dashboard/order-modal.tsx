import { apiClient } from "@/lib/api";
import { Order } from "@/lib/types";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { calcularOrderTotal, formatPrice } from "@/lib/utils";
import { finishOrderAction } from "@/actions/orders";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";

interface OrderModalProps {
  order: Order | null;
  onClose: () => Promise<void>;
}

export function OrderModal({ onClose, order }: OrderModalProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFinishOrder = async () => {
    if (!order?.id) return;

    const result = await finishOrderAction(order.id);

    if (!result.success) {
      console.log(result.error);
    }

    if (result.success) {
      router.refresh();
      onClose();
    }
  };

  return (
    <Dialog open={order !== null} onOpenChange={() => onClose()}>
      <DialogContent aria-describedby={undefined} className="max-h-[88vh] overflow-y-auto scrollbar-none border-app-border bg-app-card p-0 text-white sm:max-w-2xl">
        <DialogHeader className="border-b border-app-border px-5 py-4">
          <DialogTitle className="text-xl font-bold text-white">
            Detalhe do pedido
          </DialogTitle>
        </DialogHeader>

        <div className="px-5 pb-5">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-400">Carregando...</p>
          </div>
        ) : order ? (
          <div className="space-y-5">
            {/* Informações do pedido */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-app-border bg-app-card p-4">
                  <p>Número da mesa</p>
                  <p className="mt-1 text-2xl font-bold text-brand-primary">{order.table}</p>
              </div>
              <div className="rounded-lg border border-app-border bg-app-card p-4">
                  <p>Cliente</p>
                  <p className="mt-1 text-lg font-semibold">{order.name || "Sem nome"}</p>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-app-border bg-app-card p-4">
              <p className="text-sm text-gray-400">Status</p>
              <Badge variant="secondary" className="text-xs select-none">
                {order.status ? "Finalizado" : "Em produção"}
              </Badge>
            </div>

            {/* Itens do pedido */}
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

            
            

            {/* Total */}
            <div className="flex items-center justify-between rounded-lg border border-brand-primary/40 bg-brand-primary/10 p-4">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold text-brand-primary">{formatPrice(calcularOrderTotal(order))}</span>
            </div>
          </div>
        ) : null}

        </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end bg-transparent pb-4 px-5">
            <Button
              variant="outline"
              onClick={() => onClose()}
              className="border-app-border bg-transparent text-white hover:bg-transparent hover:text-white"
            >
              Fechar
            </Button>
            <Button
              className="bg-brand-primary text-white hover:bg-brand-primary"
              disabled={loading}
              onClick={handleFinishOrder}
            >
              Finalizar pedido
            </Button>
          </div>
      </DialogContent>

      
    </Dialog>
  );
}
