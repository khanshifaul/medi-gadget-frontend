"use client";
import { GET_USERS } from "@/app/api/graphql/queries";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@apollo/client";
import React from "react";

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  role: string;
  isTwoFactorEnabled: boolean;
  userAddresses: {
    id: string;
    type: string;
    address1: string;
    address2: string;
    state: string;
    city: string;
    postcode: string;
    country: string;
  }[];
  wishList: {
    wishedItems: {
      product: {
        name: string;
      };
    }[];
  };
  orders: {
    id: string;
  }[];
}

const UsersTable: React.FC = () => {
  const { loading, error, data } = useQuery<{ Users: User[] }>(GET_USERS);
  const users = data?.Users || [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <TableHeader className="bg-gray-100 dark:bg-gray-900">
          <TableRow>
            <TableHead className="px-4 py-2">Sl.</TableHead>
            <TableHead className="px-4 py-2">Name</TableHead>
            <TableHead className="px-4 py-2">Email</TableHead>
            <TableHead className="px-4 py-2">Role</TableHead>
            <TableHead className="px-4 py-2">Verified</TableHead>
            <TableHead className="px-4 py-2">2FA Enabled</TableHead>
            <TableHead className="px-4 py-2">Orders</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">
                No Users Found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user, index) => (
              <TableRow
                key={index}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <TableCell className="px-4 py-2">{index + 1}</TableCell>
                <TableCell className="px-4 py-2">{user.name}</TableCell>
                <TableCell className="px-4 py-2">{user.email}</TableCell>
                <TableCell className="px-4 py-2">{user.role}</TableCell>
                <TableCell className="px-4 py-2">
                  {user.emailVerified ? "Yes" : "No"}
                </TableCell>
                <TableCell className="px-4 py-2">
                  {user.isTwoFactorEnabled ? "Yes" : "No"}
                </TableCell>
                <TableCell className="px-4 py-2">
                  {user.orders.length}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
