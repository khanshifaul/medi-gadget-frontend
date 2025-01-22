import PageTitle from "@/components/protected/admin/page-title";
import {
  getMessageLength,
  getProductLength,
  getSubscriberLength,
  getUserLength,
} from "@/data/getlength";
import Link from "next/link";

const AdminDashboard = async () => {
  const subscriberLength = getSubscriberLength();
  const messageLength = getMessageLength();
  const productLength = getProductLength();
  const userLength = getUserLength();

  return (
    <div>
      <PageTitle title="Dashboard" />
      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center gap-4">
        <div className="flex flex-col justify-between border-2 rounded-lg p-2 min-w-fit w-full bg-green-900/75 hover:bg-green-900 hover:cursor-pointer ">
          <Link href="/admin/subscribers">
            <p className="text-5xl md:text-[5rem] font-bold text-start leading-none">
              {subscriberLength}
            </p>
            <p className="text-2xl pl-5 text-end">Subscribers</p>
          </Link>
        </div>
        <div className="flex flex-col justify-between border-2 rounded-lg p-2 min-w-fit w-full bg-green-900/75 hover:bg-green-900 hover:cursor-pointer">
          <Link href="/admin/messages">
            <p className="text-5xl md:text-[5rem] font-bold text-start leading-none">
              {messageLength}
            </p>
            <p className="text-2xl pl-5 text-end">Messages</p>
          </Link>
        </div>
        <div className="flex flex-col justify-between border-2 rounded-lg p-2 min-w-fit w-full bg-green-900/75 hover:bg-green-900 hover:cursor-pointer">
          <Link href="/admin/products">
            <p className="text-5xl md:text-[5rem] font-bold text-start leading-none">
              {productLength}
            </p>
            <p className="text-2xl pl-5 text-end">Products</p>
          </Link>
        </div>
        <div className="flex flex-col justify-between border-2 rounded-lg p-2 min-w-fit w-full bg-green-900/75 hover:bg-green-900 hover:cursor-pointer">
          <Link href="/admin/subscribers">
            <p className="text-5xl md:text-[5rem] font-bold text-start leading-none">
              {userLength}
            </p>
            <p className="text-2xl pl-5 text-end">Users</p>
          </Link>
        </div>
        <div className="flex flex-col justify-between border-2 rounded-lg p-2 min-w-fit w-full bg-green-900/75 hover:bg-green-900 hover:cursor-pointer">
          <Link href="/admin/subscribers">
            <p className="text-5xl md:text-[5rem] font-bold text-start leading-none">
              {userLength}
            </p>
            <p className="text-2xl pl-5 text-end">Orders</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
