"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { orders } from "@/data/orders";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

const PAGE_SIZE = 10;

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const filteredOrders = orders
    .filter((order) =>
      order.orderId.includes(searchQuery) ||
      order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((order) =>
      filterStatus ? order.status === filterStatus : true
    )
    .filter((order) => {
      if (dateRange.from && dateRange.to) {
        const orderDate = new Date(order.date);
        return orderDate >= new Date(dateRange.from) && orderDate <= new Date(dateRange.to);
      }
      return true;
    });

  const paginatedOrders = filteredOrders.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Orders</h1>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <Input placeholder="Search by Order ID, Product, Customer" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <select className="border p-2 rounded" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
        <input type="date" className="border p-2 rounded" onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })} />
        <input type="date" className="border p-2 rounded" onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })} />
      </div>

      {/* Orders Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedOrders.map((order) => (
            <TableRow
              key={order.orderId}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => router.push(`/admin/orders/${order.orderId}`)}
            >
              <TableCell>{order.orderId}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{order.productName}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{format(new Date(order.date), "yyyy-MM-dd")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <Button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>Previous</Button>
        <span>Page {currentPage}</span>
        <Button disabled={currentPage * PAGE_SIZE >= filteredOrders.length} onClick={() => setCurrentPage((prev) => prev + 1)}>Next</Button>
      </div>
    </div>
  );
}
