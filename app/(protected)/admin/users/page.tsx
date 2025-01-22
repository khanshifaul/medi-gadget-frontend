import PageTitle from "@/components/protected/admin/page-title";
import UsersTable from "@/components/protected/admin/user-table";
import React from "react";

const UserPage: React.FC = () => {
  return (
    <div>
      <PageTitle title="Users" />
      <div className="flex justify-start items-center my-4">
        <UsersTable />
      </div>
    </div>
  );
};

export default UserPage;
