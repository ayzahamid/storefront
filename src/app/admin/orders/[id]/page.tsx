"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { orders } from "@/data/orders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  // Find the order by ID
  const order = orders.find((o) => o.orderId === id);

  // Handle invalid order ID
  if (!order) {
    return <div className="p-6 text-red-500">Order not found.</div>;
  }

  // Manage order status locally
  const [status, setStatus] = useState(order.status);

  return (
    <div className="p-6 space-y-6">
      <Button variant="outline" onClick={() => router.push("/admin")}>← Back to Orders</Button>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Order ID:</strong> {order.orderId}</p>
          <p><strong>Date:</strong> {order.date}</p>
          <p><strong>Status:</strong> {status}</p>
        </CardContent>
      </Card>

      {/* Customer Details */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Name:</strong> {order.customerName}</p>
        </CardContent>
      </Card>

      {/* Product Details */}
      <Card>
        <CardHeader>
          <CardTitle>Product</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Product Name:</strong> {order.productName}</p>
        </CardContent>
      </Card>
    </div>
  );
}
