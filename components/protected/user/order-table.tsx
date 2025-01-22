"use client";
import { GET_ORDERS } from "@/app/api/graphql/queries";
import { useCurrentUser } from "@/lib/hooks";
import { IOrder, IOrderItem } from "@/types";
import { useQuery } from "@apollo/client";
import React from "react";

const OrderTable: React.FC = () => {
  const user = useCurrentUser();
  const { loading, error, data } = useQuery(GET_ORDERS);
  const orders: IOrder[] = data?.Orders || [];
  const userOrders = orders.filter((order) => order.userId === user?.id);

  const newOrders = userOrders.filter((order) => order.status !== "SHIPPED");
  const completedOrders = userOrders.filter(
    (order) => order.status === "SHIPPED"
  );

  if (error) return <p>Error: {error.message}</p>;

  const renderOrdersTable = (orders: IOrder[], title: string) => (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <table className="min-w-full light:bg-white">
        <thead>
          <tr>
            <th className="py-2">Sl.</th>
            <th className="py-2">Payment Method</th>
            <th className="py-2">Order Status</th>
            <th className="py-2">Items</th>
            <th className="py-2">Total Payable</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : orders.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4">
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order, index) => (
              <tr key={order.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{order.paymentMethod}</td>
                <td className="border px-4 py-2">{order.status}</td>
                <td className="border px-4 py-2">
                  <ul>
                    {order.items.map((item: IOrderItem, idx) => (
                      <li key={idx}>
                        {idx + 1}. {item.product.name} (SKU: {item.product.sku})
                        - ({item.quantity} ❌ {item.price} = {item.subtotal})
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="border px-4 py-2">
                  {order.totalPayable.toFixed(2)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
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
