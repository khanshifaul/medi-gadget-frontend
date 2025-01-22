"use client";
import { DELETE_NEWSLETTERSUBSCRIBER } from "@/app/api/graphql/mutation";
import { GET_NEWSLETTERSUBSCRIBERS } from "@/app/api/graphql/queries";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { INewsletterSubscriber } from "@/types";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import DeleteDialog from "./delete-dialog";

const NewsletterSubscriberTable = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_NEWSLETTERSUBSCRIBERS);
  const Subscribers: INewsletterSubscriber[] =
    data?.NewsletterSubscribers || [];

  const [deleteNewsletterSubscriber] = useMutation(
    DELETE_NEWSLETTERSUBSCRIBER,
    {
      onCompleted: () => {
        router.refresh();
      },
    }
  );

  const handleDelete = (id: string) => {
    deleteNewsletterSubscriber({
      variables: { deleteNewsletterSubscriberId: id },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full">
      <Table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <TableHeader className="bg-gray-300 dark:bg-gray-900">
          <TableRow>
            <TableHead className="px-4 py-2 text-gray-700 dark:text-gray-300">
              Sl.
            </TableHead>
            <TableHead className="px-4 py-2 text-gray-700 dark:text-gray-300">
              Email
            </TableHead>
            <TableHead className="px-4 py-2 text-gray-700 dark:text-gray-300">
              Subscribed At
            </TableHead>
            <TableHead className="px-4 py-2 text-gray-700 dark:text-gray-300">
              Delete
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Subscribers.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center py-4 text-gray-700 dark:text-gray-300"
              >
                No Subscribers Found
              </TableCell>
            </TableRow>
          ) : (
            Subscribers.map((subscriber, index) => (
              <TableRow
                key={subscriber.id}
                className="hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <TableCell className="px-4 py-2 text-gray-700 dark:text-gray-300">
                  {index + 1}
                </TableCell>
                <TableCell className="px-4 py-2 text-gray-700 dark:text-gray-300">
                  {subscriber.email}
                </TableCell>
                <TableCell className="px-4 py-2 text-gray-700 dark:text-gray-300">
                  {subscriber.subscribedAt
                    ? new Date(subscriber.subscribedAt).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell className="px-4 py-2 text-gray-700 dark:text-gray-300">
                  <DeleteDialog
                    Id={subscriber.id}
                    item="subscriber"
                    onDelete={handleDelete}
                    prefetchAction={() => {
                      router.refresh();
                    }}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default NewsletterSubscriberTable;
