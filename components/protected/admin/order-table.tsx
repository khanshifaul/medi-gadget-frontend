"use client";
import { DELETE_ORDER } from "@/app/api/graphql/mutation";
import { GET_ORDERS } from "@/app/api/graphql/queries";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="py-2">Sl.</TableHead>
          <TableHead className="py-2">User Details</TableHead>
          <TableHead className="py-2">Delivery Address</TableHead>
          <TableHead className="py-2">Payment Method</TableHead>
          <TableHead className="py-2">Order Status</TableHead>
          <TableHead className="py-2">Total Payable</TableHead>
          <TableHead className="py-2">Items</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-4">
              Loading...
            </TableCell>
          </TableRow>
        ) : null}
        {orders.map((order, index) => (
          <TableRow key={order.id}>
            <TableCell className="border px-4 py-2">{index + 1}</TableCell>
            <TableCell className="border px-4 py-2">
              {order.user.name}
            </TableCell>
            <TableCell className="border px-4 py-2">
              {order.deliveryAddress}
            </TableCell>
            <TableCell className="border px-4 py-2">
              {order.paymentMethod}
            </TableCell>
            <TableCell className="border px-4 py-2">{order.status}</TableCell>
            <TableCell className="border px-4 py-2">
              {order.totalPayable.toFixed(2)}
            </TableCell>
            <TableCell className="border px-4 py-2">
              <ul>
                {order.items.map((item: IOrderItem, index) => (
                  <li key={index}>
                    {index + 1}. {item.product.name} (SKU: {item.product.sku}) -
                    ({item.quantity} ❌ {item.price} = {item.subtotal})
                  </li>
                ))}
              </ul>
            </TableCell>
            <TableCell className="border px-4 py-2">
              <DeleteDialog
                Id={order.id}
                item="order"
                onDelete={handleDelete}
                prefetchAction={prefetchAction}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderTable;
