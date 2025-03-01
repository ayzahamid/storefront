"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import products from "@/data/products";

export default function CartPage() {
  const [cart, setCart] = useState<number[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter((item) => item !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const cartItems = cart.map((id) => products.find((p) => p.id === id)).filter(Boolean);
  const totalPrice = cartItems.reduce((sum, product) => sum + (product?.price || 0), 0);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid gap-4">
          {cartItems.map((product) => (
            <Card key={product!.id} className="flex items-center justify-between p-4">
              <CardContent className="flex items-center gap-4">
                <img
                  src={`https://picsum.photos/id/${product!.id}/5000/3333`}
                  alt={product!.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <CardTitle>{product!.name}</CardTitle>
                  <p className="text-gray-600">${product!.price}</p>
                </div>
              </CardContent>
              <Button variant="destructive" onClick={() => removeFromCart(product!.id)}>
                Remove
              </Button>
            </Card>
          ))}

          <div className="text-lg font-bold mt-4">Total: ${totalPrice}</div>

          <div className="flex gap-4 mt-4">
            <Button variant="secondary" onClick={clearCart}>
              Clear Cart
            </Button>
            <Button>Proceed to Checkout</Button>
          </div>
        </div>
      )}
    </div>
  );
}
