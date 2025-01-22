import Logo from "@/components/logo";
import PageTitle from "@/components/protected/admin/page-title";
import { Button } from "@/components/ui/button";
import { MdEdit } from "react-icons/md";
const MyStore = () => {
  return (
    <div>
      <PageTitle title="My Store">
        <div className="flex gap-2">
          <Button size={"sm"} aria-label="Edit Information">
            <MdEdit className="text-xl" />
          </Button>
        </div>
      </PageTitle>

      <div>
        <div className="flex items-center gap-2 p-2">
          Logo: <Logo />
        </div>
        <div className="p-2">Name: MediGadget</div>
        <div className="p-2">
          Address: 236 5th SE Avenue, NY 10011, United States
        </div>
      </div>
    </div>
  );
};

export default MyStore;
