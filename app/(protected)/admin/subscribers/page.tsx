import NewsletterSubscriberTable from "@/components/protected/admin/newslettersubscriber-table";
import PageTitle from "@/components/protected/admin/page-title";
import { Button } from "@/components/ui/button";
import { MdDownload } from "react-icons/md";

const Subscribers = () => {
  return (
    <div>
      <PageTitle title="Subscribers">
        <div className="flex gap-2">
          <Button size={"sm"} aria-label="Download as CSV">
            <MdDownload className="text-xl" />
          </Button>
        </div>
      </PageTitle>

      <div className="flex justify-start items-center my-4">
        <NewsletterSubscriberTable />
      </div>
    </div>
  );
};

export default Subscribers;
