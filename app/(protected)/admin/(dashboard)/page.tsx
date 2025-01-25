import PageTitle from "@/components/protected/admin/page-title";
import {
  getCategoryLength,
  getMessageLength,
  getOrderLength,
  getProductLength,
  getSubscriberLength,
  getUserLength,
} from "@/data/getlength";
import Link from "next/link";

const AdminDashboard = async () => {
  const stats = await Promise.all([
    {
      label: "Subscribers",
      value: getSubscriberLength(),
      link: "/admin/subscribers",
    },
    { label: "Messages", value: getMessageLength(), link: "/admin/messages" },
    {
      label: "Categories",
      value: getCategoryLength(),
      link: "/admin/product-categories",
    },
    { label: "Products", value: getProductLength(), link: "/admin/products" },
    { label: "Users", value: getUserLength(), link: "/admin/users" },
    { label: "Orders", value: getOrderLength(), link: "/admin/orders" },
  ]);

  return (
    <div>
      <PageTitle title="Dashboard" />
      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center gap-4">
        {stats.map(async ({ label, value, link }) => (
          <div
            key={label}
            className="flex flex-col justify-between border-2 rounded-lg p-2 min-w-fit w-full bg-green-900/75 hover:bg-green-900 hover:cursor-pointer"
          >
            <Link href={link}>
              <p className="text-5xl md:text-[5rem] font-bold text-start leading-none">
                {await value}
              </p>
              <p className="text-2xl pl-5 text-end">{label}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
