"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectTrigger, SelectItem } from "@/components/ui/select";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import products_list from "@/data/products_list";

const imageUrls = [
  "https://picsum.photos/id/0/5000/3333",
  "https://picsum.photos/id/1/5000/3333",
  "https://picsum.photos/id/2/5000/3333",
  "https://picsum.photos/id/3/5000/3333",
  "https://picsum.photos/id/4/5000/3333",
  "https://picsum.photos/id/5/5000/3334",
  "https://picsum.photos/id/6/5000/3333",
  "https://picsum.photos/id/7/4728/3168",
  "https://picsum.photos/id/8/5000/3333",
  "https://picsum.photos/id/9/5000/3269"
];

export default function AllProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  const filteredProducts = products_list
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) => (category === "all" ? true : product.category === category))
    .sort((a, b) => {
      if (sort === "price_low") return a.price - b.price;
      if (sort === "price_high") return b.price - a.price;
      if (sort === "alphabetical") return a.name.localeCompare(b.name);
      if (sort === "best_sellers") return b.sold - a.sold;
      return 0;
    });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>Select Category</SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="fashion">Fashion</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger>Sort By</SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="price_low">Price: Low to High</SelectItem>
            <SelectItem value="price_high">Price: High to Low</SelectItem>
            <SelectItem value="alphabetical">Alphabetical</SelectItem>
            <SelectItem value="best_sellers">Best Sellers</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <Link key={product.id} href={`/client/products/${product.id}`}>
            <Card className="cursor-pointer">
              <CardContent className="p-4 flex flex-col items-center">
                <img src={imageUrls[index % imageUrls.length]} alt={product.name} className="rounded-lg w-full h-40 object-cover" />
                <CardTitle className="mt-4 text-center">{product.name}</CardTitle>
                <p className="text-gray-600">${product.price}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
