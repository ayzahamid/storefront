"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import products_list from "@/data/products_list";

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<number[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    if (!shippingInfo.name || !shippingInfo.email || !shippingInfo.address) {
      alert("Please fill in all required fields.");
      return;
    }

    const orderItems = cart.map((id) => products_list.find((p) => p.id === id)).filter(Boolean);
    const totalPrice = orderItems.reduce((sum, product) => sum + (product?.price || 0), 0);

    const newOrder = {
      id: Math.floor(Math.random() * 10000),
      items: orderItems,
      total: totalPrice,
      shippingInfo,
    };

    setOrderDetails(newOrder);
    setOrderPlaced(true);
    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {orderPlaced ? (
        <div className="text-center">
          <h2 className="text-xl font-semibold text-green-600">Order Placed Successfully!</h2>
          <p>Order ID: #{orderDetails.id}</p>
          <p>Total Amount: ${orderDetails.total}</p>
          <Button className="mt-4" onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Shipping Information */}
          <Card>
            <CardContent className="p-6">
              <CardTitle>Shipping Information</CardTitle>
              <div className="grid gap-4 mt-4">
                <div>
                  <Label>Name</Label>
                  <Input name="name" value={shippingInfo.name} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input name="email" type="email" value={shippingInfo.email} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label>Address</Label>
                  <Input name="address" value={shippingInfo.address} onChange={handleInputChange} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>City</Label>
                    <Input name="city" value={shippingInfo.city} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label>ZIP Code</Label>
                    <Input name="zip" value={shippingInfo.zip} onChange={handleInputChange} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardContent className="p-6">
              <CardTitle>Order Summary</CardTitle>
              {cart.length === 0 ? (
                <p className="text-gray-500">No items in the cart.</p>
              ) : (
                <div className="mt-4">
                  {cart.map((id) => {
                    const product = products_list.find((p) => p.id === id);
                    return (
                      <div key={id} className="flex justify-between py-2 border-b">
                        <span>{product?.name}</span>
                        <span>${product?.price}</span>
                      </div>
                    );
                  })}
                  <div className="mt-4 text-lg font-bold">
                    Total: $
                    {cart.reduce((sum, id) => {
                      const product = products_list.find((p) => p.id === id);
                      return sum + (product?.price || 0);
                    }, 0)}
                  </div>
                  <Button className="mt-4 w-full" onClick={placeOrder}>
                    Place Order
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
