import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GrCompare } from "react-icons/gr";

const CompareBtn = () => {
  return (
    <Button variant="outline" size="icon" className="h-8">
      <Link href="/compare">
        <GrCompare className="text-2xl" />
      </Link>
    </Button>
  );
};

export default CompareBtn;
