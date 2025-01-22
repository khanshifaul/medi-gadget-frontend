import DeleteDialog from "@/components/protected/admin/delete-dialog";
import PageTitle from "@/components/protected/admin/page-title";
import UserPageBanner from "@/components/protected/user/user-page-banner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const MyWishlist = () => {
  // Define the onDelete function
  const handleDelete = (id: string) => {
    console.log(`Deleting item with id: ${id}`);
    // Implement the logic to delete the item from the wishlist
    // For example, call an API or update the state
  };

  // Define the prefetchAction function
  const prefetchAction = () => {
    console.log("Prefetching data...");
    // Implement any prefetch logic if needed
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <UserPageBanner title="My Wishlist" />

      <PageTitle title="My Wishlist" />
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Index</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>
                <DeleteDialog
                  Id="1"
                  item="Product"
                  onDelete={handleDelete}
                  prefetchAction={prefetchAction}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MyWishlist;
