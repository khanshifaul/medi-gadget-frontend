import "@/app/globals.css";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";
const NotFound = () => {
  return (
    <>
      <div className="md:container mx-auto text-center my-12">
        <div className="flex flex-col items-center space-y-2">
          <TriangleAlert className="text-9xl text-red-700" />
          <h1 className="font-bold text-xl">404 - Page Not Found</h1>
          <p>Sorry, the page you are looking for could not be found.</p>
          <Button>
            <Link href="/">Home</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
