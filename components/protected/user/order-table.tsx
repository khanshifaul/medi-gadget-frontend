"use client";
import { GET_ORDERS } from "@/app/api/graphql/queries";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCurrentUser } from "@/lib/hooks";
import { IOrder, IOrderItem } from "@/types";
import { useQuery } from "@apollo/client";
import React from "react";

const OrderTable: React.FC = () => {
  const user = useCurrentUser();
  const { loading, error, data } = useQuery(GET_ORDERS);
  const orders: IOrder[] = data?.Orders || [];
  const userOrders = orders.filter((order) => order.user.id === user?.id);

  const newOrders = userOrders.filter((order) => order.status !== "SHIPPED");
  const completedOrders = userOrders.filter(
    (order) => order.status === "SHIPPED"
  );

  if (error) return <p>Error: {error.message}</p>;

  const renderOrdersTable = (orders: IOrder[], title: string) => (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <Table className="min-w-full light:bg-white">
        <TableHeader>
          <TableRow>
            <TableHead className="py-2">Sl.</TableHead>
            <TableHead className="py-2">Payment Method</TableHead>
            <TableHead className="py-2">Order Status</TableHead>
            <TableHead className="py-2">Items</TableHead>
            <TableHead className="py-2">Total Payable</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                Loading...
              </TableCell>
            </TableRow>
          ) : orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No orders found.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order, index) => (
              <TableRow key={order.id}>
                <TableCell className="border px-4 py-2">{index + 1}</TableCell>
                <TableCell className="border px-4 py-2">
                  {order.paymentMethod}
                </TableCell>
                <TableCell className="border px-4 py-2">
                  {order.status}
                </TableCell>
                <TableCell className="border px-4 py-2">
                  <ul>
                    {order.items.map((item: IOrderItem, idx) => (
                      <li key={idx}>
                        {idx + 1}. {item.product.name} (SKU: {item.product.sku})
                        - ({item.quantity} ❌ {item.price} = {item.subtotal})
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell className="border px-4 py-2">
                  {order.totalPayable.toFixed(2)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div>
      {renderOrdersTable(newOrders, "New Orders")}
      {renderOrdersTable(completedOrders, "Completed Orders")}
    </div>
  );
};

export default OrderTable;
