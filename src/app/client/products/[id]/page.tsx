"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import products_list from "@/data/products_list";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const product = products_list.find((p) => p.id === Number(id));

  const [cart, setCart] = useState<number[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const addToCart = () => {
    if (!cart.includes(product!.id)) {
      const newCart = [...cart, product!.id];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  if (!product) {
    return <div className="text-center text-xl text-red-500">Product not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto p-6">
        <CardContent className="flex flex-col items-center">
          <img
            src={`https://picsum.photos/id/${product.id}/5000/3333`}
            alt={product.name}
            className="rounded-lg w-full h-80 object-cover"
          />
          <CardTitle className="text-2xl mt-4">{product.name}</CardTitle>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-lg font-bold mt-2">${product.price}</p>
          <div className="flex gap-4 mt-4">
            <Button onClick={addToCart}>Add to Cart</Button>
            <Button variant="secondary" onClick={() => router.push("/client/cart")}>
              Go to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
