"use client";
import { DELETE_ORDER } from "@/app/api/graphql/mutation";
import { GET_ORDERS } from "@/app/api/graphql/queries";
import { IOrder, IOrderItem } from "@/types";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import DeleteDialog from "./delete-dialog";

const OrderTable: React.FC = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_ORDERS);
  const orders: IOrder[] = data?.Orders || [];

  const [deleteOrder] = useMutation(DELETE_ORDER, {
    onCompleted: () => {
      router.refresh();
    },
  });

  const handleDelete = (id: string) => {
    console.log(`Deleting order with id: ${id}`);
    deleteOrder({ variables: { deleteOrderId: id } })
      .then(() => {
        toast.success("Order deleted successfully");
      })
      .catch((error) => {
        toast.error("Error deleting order:", error);
        console.error(error);
      });
  };

  if (error) return <p>Error: {error.message}</p>;

  function prefetchAction(): void {
    router.refresh();
  }

  return (
    <table className="min-w-full light:bg-white">
      <thead>
        <tr>
          <th className="py-2">Sl.</th>
          <th className="py-2">User Details</th>
          <th className="py-2">Delivery Address</th>
          <th className="py-2">Payment Method</th>
          <th className="py-2">Order Status</th>
          <th className="py-2">Total Payable</th>
          <th className="py-2">Items</th>
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
            <td className="border px-4 py-2">{order.user.name}</td>
            <td className="border px-4 py-2">{order.deliveryAddress}</td>
            <td className="border px-4 py-2">{order.paymentMethod}</td>
            <td className="border px-4 py-2">{order.status}</td>
            <td className="border px-4 py-2">
              {order.totalPayable.toFixed(2)}
            </td>
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
              <DeleteDialog
                Id={order.id}
                item="order"
                onDelete={handleDelete}
                prefetchAction={prefetchAction}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
