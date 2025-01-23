"use client";
import { GET_PRODUCT } from "@/app/api/graphql/queries";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { selectCompareItemIds } from "@/lib/features/compare/compareSlice";
import { useAppSelector } from "@/lib/hooks";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { GrCompare } from "react-icons/gr";

const CompareBtn = () => {
  const compareItemIds = useAppSelector(selectCompareItemIds);
  console.log(compareItemIds);

  // Fetch product data for each product ID
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { productId: compareItemIds[0] },
    skip: compareItemIds.length === 0,
  });

  // Store product data in an array
  const productArray = data ? [data.Product] : [];
  console.log(productArray);

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="h-8 relative">
            <GrCompare className="text-2xl" />
          </Button>
        </SheetTrigger>

        <SheetContent className="flex flex-col gap-2 min-h-screen md:min-w-[50vw] min-w-[100vw] fixed top-0 right-0 z-50 transition-all bg-background text-foreground p-2 rounded-r-none">
          <SheetHeader className="w-full flex flex-row items-center justify-between bg-accent rounded-md p-3">
            <SheetTitle className="flex">Compare Products</SheetTitle>
          </SheetHeader>

          <div className="bg-accent rounded-md p-2 overflow-auto">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error loading products</div>
            ) : productArray.length > 0 ? (
              <Table className="w-full">
                <TableHeader className="bg-secondary/100 rounded-lg">
                  <TableRow className="rounded-lg">
                    {productArray.map((product) => (
                      <TableHead
                        key={product.id}
                        className="text-default font-semibold"
                      >
                        {product.name}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    {productArray.map((product) => (
                      <TableCell key={product.id}>
                        <Image
                          src={product.images[0] || "/placeholder.jpg"}
                          alt={product.name}
                          width={100}
                          height={100}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    {productArray.map((product) => (
                      <TableCell key={product.id}>
                        {product.offerPrice.toFixed(2)}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    {productArray.map((product) => (
                      <TableCell key={product.id}>{product.sku}</TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            ) : (
              <div className="text-center mt-4">
                <h1>No products selected for comparison</h1>
              </div>
            )}
          </div>

          <SheetFooter className="w-full bg-accent rounded-md p-2">
            <SheetClose asChild>
              <Button size="lg" className="w-full">
                Close Comparison
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CompareBtn;
