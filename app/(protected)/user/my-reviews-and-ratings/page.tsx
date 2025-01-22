import PageTitle from "@/components/protected/admin/page-title";
import UserPageBanner from "@/components/protected/user/user-page-banner";

const MyReviewAndRating = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <UserPageBanner title="My Review and Rating" />
      <PageTitle title="My Review and Rating" />
      <div></div>
    </div>
  );
};

export default MyReviewAndRating;
