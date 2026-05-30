import { ButtonDeleteProduct } from "@/components/dashboard/buttonDeleteProduct";
import { ProductForm } from "@/components/dashboard/product-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Category, Product } from "@/lib/types";
import { ImageOff, Package } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default async function Products() {
  const token = await getToken();

  const [products, categories] = await Promise.all([
    apiClient<Product[]>("/products", {
      token: token!,
    }),
    apiClient<Category[]>("/category", {
      token: token!,
    }),
  ]);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Produtos
          </h1>
          <p className="text-sm sm:text-base mt-1">
            Gerencie os produtos do cardápio
          </p>
        </div>

        <ProductForm categories={categories} />
      </div>

      {categories.length === 0 && (
        <p className="text-sm text-gray-300">
          Cadastre uma categoria antes de criar produtos.
        </p>
      )}

      {products.length !== 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className="bg-app-card border-app-border transition-shadow hover:shadow-md text-white"
            >
              <div className="aspect-video bg-app-background overflow-hidden">
                {product.banner ? (
                  <img
                    src={product.banner}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400">
                    <ImageOff className="w-8 h-8" />
                  </div>
                )}
              </div>

              <CardHeader>
                <CardTitle className="gap-2 flex items-center justify-between text-base md:text-lg">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    <span>{product.name}</span>
                  </div>

                  <ButtonDeleteProduct productId={product.id} />
                </CardTitle>
                <CardDescription>{product.category.name}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                <p className="text-sm text-gray-300 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-lg font-semibold text-brand-primary">
                  {formatPrice(product.price)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
