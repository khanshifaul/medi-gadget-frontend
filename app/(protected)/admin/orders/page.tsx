import OrderTable from "@/components/protected/admin/order-table";
import PageTitle from "@/components/protected/admin/page-title";

const OrdersPage = () => {
  return (
    <div>
      <PageTitle title="Orders" />
      <OrderTable />
    </div>
  );
};

export default OrdersPage;
