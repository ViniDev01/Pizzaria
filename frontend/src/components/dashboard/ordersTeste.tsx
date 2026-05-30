"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { Order } from "@/lib/types";
import { apiClient } from "@/lib/api";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { calcularOrderTotal, formatPrice } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import { OrderModal } from "@/components/dashboard/order-modal";
import { ButtonRefresh } from "./buttonRefresh";

interface OrdersProps {
  token: string;
}

export function Orders({ token }: OrdersProps) {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);

  const fetchOrders = async () => {
    try {
      const response = await apiClient<Order[]>("/orders?draft=false", {
        method: "GET",
        cache: "no-store",
        token: token,
      });

      const pendingOrders = response.filter((order) => !order.status);

      setOrders(pendingOrders);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    async function loadOrders() {
      await fetchOrders();
    }

    loadOrders();
  }, []);

  return (
    <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Pedidos</h1>
                <p className="text-sm sm:text-base mt-1">
                    Gerencie os pedidos da cozinha
                </p>
            </div>

            <ButtonRefresh />
        </div>

        {loading ? (
            <div>
                <p className="text-center text-gray-300">Carregando pedidos...</p>
            </div>
        ) : orders.length === 0 ? (
            <div>
                <p className="text-center text-gray-300">Nenhum pedido encontrado.</p>
            </div>
        ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
                <Card
                    key={order.id}
                    className="bg-app-card border-app-border text-white"
                >
                <CardHeader>
                    <div className="flex items-center justify-between gap-2">
                        <CardTitle className="text-lg lg:text-xl font-bold">
                            Mesa {order.table}
                        </CardTitle>
                        <Badge variant="secondary" className="text-xs select-none">
                            produção
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="space-y-3 sm:space-y-4 mt-auto">
                    <div>
                    {order.items && order.items.length > 0 && (
                        <div className="space-y-1">
                        {order.items.slice(0, 2).map((item) => (
                            <p
                            key={item.id}
                            className="text-xs sm:text-sm text-gray-300 truncate"
                            >
                            • {item.amount}x {item.product.name}
                            </p>
                        ))}
                        </div>
                    )}
                    </div>

                    <div className="flex flex-col xl:flex-row items-center justify-between pt-4 border-t border-app-border gap-3">
                    <div className="self-start">
                        <p className="text-sm md:text-base text-gray-400">Total</p>
                        <p className="text-base font-bold text-brand-primary">
                        {formatPrice(calcularOrderTotal(order))}
                        </p>
                    </div>

                    <Button
                        size="sm"
                        className="bg-brand-primary hover:bg-brand-primary w-full xl:w-auto"
                        onClick={() => setSelectedOrder(order)}
                    >
                        <EyeIcon className="w-5 h-5" />
                        Detalhes
                    </Button>
                    </div>
                </CardContent>
                </Card>
            ))}
        </div>
      )}

      <OrderModal
        order={selectedOrder}
        onClose={async () => {
          setSelectedOrder(null);
          await fetchOrders();
        }}
      />
    </div>
  );
}
