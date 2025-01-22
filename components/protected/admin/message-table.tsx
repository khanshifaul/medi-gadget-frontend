"use client";
import { DELETE_MESSAGE } from "@/app/api/graphql/mutation";
import { GET_MESSAGES } from "@/app/api/graphql/queries";
import DeleteDialog from "@/components/protected/admin/delete-dialog";
import MessageSheet from "@/components/protected/admin/message-sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IMessages } from "@/types";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MessagesTable = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_MESSAGES);
  const [selectedMessage, setSelectedMessage] = useState<IMessages | null>(
    null
  );

  // Move the useMutation hook to the top level
  const [deleteMessage] = useMutation(DELETE_MESSAGE, {
    onCompleted: () => {
      router.refresh();
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const messages: IMessages[] = data?.Messages || [];

  const handleRowClick = (message: IMessages) => {
    setSelectedMessage(message);
  };

  const handleDelete = (id: string) => {
    deleteMessage({ variables: { deleteMessageId: id } });
  };

  return (
    <div className="w-full">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((message, index) => (
            <TableRow
              key={index}
              onClick={() => handleRowClick(message)}
              className="cursor-pointer"
            >
              <TableCell>{message.name}</TableCell>
              <TableCell>{message.email}</TableCell>
              <TableCell>{message.subject}</TableCell>
              <TableCell>
                {message.createdAt
                  ? new Date(message.createdAt).toLocaleString()
                  : "N/A"}
              </TableCell>
              <TableCell>
                <DeleteDialog
                  Id={message.id}
                  item="message"
                  onDelete={handleDelete}
                  prefetchAction={() => {
                    router.refresh();
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedMessage && (
        <MessageSheet
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
        />
      )}
    </div>
  );
};

export default MessagesTable;
