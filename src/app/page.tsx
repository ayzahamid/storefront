"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, ShieldCheck, Truck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin View Button */}
      <div className="flex justify-end p-4">
        <Button
          className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md shadow-md transition"
          onClick={() => router.push("/admin")}
        >
          Admin View
        </Button>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-20 px-6">
        <h1 className="text-5xl font-extrabold">Welcome to Our Store</h1>
        <p className="mt-4 text-lg opacity-90">
          Discover amazing products and shop with confidence.
        </p>
        <Button
          className="mt-6 bg-white text-indigo-600 font-semibold text-lg px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition"
          onClick={() => router.push("/client/products")}
        >
          Shop Now
        </Button>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white shadow-lg">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-blue-700">Wide Selection</CardTitle>
            <ShoppingBag className="w-8 h-8 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Browse through a wide range of high-quality products curated just for you.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-green-700">Secure Payments</CardTitle>
            <ShieldCheck className="w-8 h-8 text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Shop with confidence using our encrypted and secure payment gateway.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-yellow-700">Fast Delivery</CardTitle>
            <Truck className="w-8 h-8 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Enjoy swift and reliable shipping right to your doorstep.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <div className="text-center py-16 bg-gray-900 text-white">
        <h2 className="text-3xl font-bold">Ready to Shop?</h2>
        <p className="mt-2 text-gray-300">Start exploring our collection today!</p>
        <Button
          className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-lg px-6 py-3 rounded-lg shadow-md transition"
          onClick={() => router.push("/client")}
        >
          Explore Now
        </Button>
      </div>
    </div>
  );
}
