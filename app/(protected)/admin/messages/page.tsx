import MessagesTable from "@/components/protected/admin/message-table";
import PageTitle from "@/components/protected/admin/page-title";
import { Button } from "@/components/ui/button";

const MessagesPage = () => {
  return (
    <div>
      <PageTitle title="Messages">
        <div className="flex gap-2">
          <Button size={"sm"}>New Message</Button>
        </div>
      </PageTitle>

      <div className="flex justify-start items-center my-4">
        <MessagesTable />
      </div>
    </div>
  );
};

export default MessagesPage;
