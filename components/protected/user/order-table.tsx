"use client";
import { GET_ORDERS } from "@/app/api/graphql/queries";
import { IOrder, IOrderItem } from "@/types";
import { useQuery } from "@apollo/client";
import React from "react";

const OrderTable: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ORDERS);
  const orders: IOrder[] = data?.Orders || [];

  if (error) return <p>Error: {error.message}</p>;

  return (
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
            <td colSpan={7} className="text-center py-4">
              Loading...
            </td>
          </tr>
        ) : null}
        {orders.map((order, index) => (
          <tr key={order.id}>
            <td className="border px-4 py-2">{index + 1}</td>
            <td className="border px-4 py-2">{order.paymentMethod}</td>
            <td className="border px-4 py-2">{order.status}</td>
            <td className="border px-4 py-2">
              <ul>
                {order.items.map((item: IOrderItem, index) => (
                  <li key={index}>
                    {index + 1}. {item.product.name} (SKU: {item.product.sku}) -
                    ({item.quantity} ❌ {item.price} = {item.subtotal})
                  </li>
                ))}
              </ul>
            </td>
            <td className="border px-4 py-2">
              {order.totalPayable.toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
