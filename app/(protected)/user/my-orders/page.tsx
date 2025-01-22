import PageTitle from "@/components/protected/admin/page-title";
import UserPageBanner from "@/components/protected/user/user-page-banner";

const MyOrder = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <UserPageBanner title="My order" />
      <PageTitle title="My Orders" />
      <div></div>
    </div>
  );
};

export default MyOrder;
