import React, { useEffect } from "react";
import LineGraph from "./LineGraph";
import BarGraph from "./BarGraph";
import PieChart from "./PieChart";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "@/store/admin/productsSlice";
import { getAllOrders } from "@/store/admin/orderSlice";

const DashboardCharts = () => {
  const { productList } = useSelector((state) => state.adminProducts);
  const { orderList } = useSelector((state) => state.AdminOrder);
  console.log("productList", productList);
  const dispatch = useDispatch();

  const countOrdersByStatus = (orderList, status) => {
    return (
      orderList?.filter((order) => order?.orderStatus === status).length || 0
    );
  };

  const ConfirmedOrders = countOrdersByStatus(orderList, "confirmed");
  const ShippedOrders = countOrdersByStatus(orderList, "Shipping");
  const DeliveredOrders = countOrdersByStatus(orderList, "Delivered");
  const RejectedOrders = countOrdersByStatus(orderList, "Rejected");
  const PendingOrders = countOrdersByStatus(orderList, "Pending");
  const ProcessingOrders = countOrdersByStatus(orderList, "processing");

  const orderStatusData = [
    { name: "Confirmed", value: ConfirmedOrders },
    { name: "Shipping", value: ShippedOrders },
    { name: "Delivered", value: DeliveredOrders },
    { name: "Rejected", value: RejectedOrders },
    { name: "Pending", value: PendingOrders },
    { name: "Processing", value: ProcessingOrders },
  ];

  const countProductsByCategory = (productList, category) => {
    return (
      productList?.filter((product) => product?.category === category).length ||
      0
    );
  };

  const menProducts = countProductsByCategory(productList, "men");
  const womenProducts = countProductsByCategory(productList, "women");
  const kidsProducts = countProductsByCategory(productList, "kids");
  const footProducts = countProductsByCategory(productList, "footwear");
  const accessoryProducts = countProductsByCategory(productList, "accessories");

  const poductCategoryData = [
    { name: "Men", value: menProducts },
    { name: "Women", value: womenProducts },
    { name: "Kids", value: kidsProducts },
    { name: "Footwear", value: footProducts },
    { name: "Accessories", value: accessoryProducts },
  ];

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <div className="h -full min-h-screen bg-slate-100">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-center w-full h-96 p-2 shadow-sm shadow-black rounded-lg ">
          <div className="w-full h-full py-4 flex items-center justify-center">
            <LineGraph />
          </div>
        </div>
        <div className="flex items-center justify-center w-full h-96 p-2 shadow-sm shadow-black rounded-lg">
          <div className="w-full h-full py-4 flex items-center justify-center">
            <BarGraph />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 border mt-5 p-5 gap-10">
        <div className="flex items-center justify-center">
          <PieChart
            productCategoryData={poductCategoryData}
            totalProducts={productList?.length}
            title="Product Categories"
            colorScheme={[
              "#457B9D",
              "#F7B53F",
              "#3498DB",
              "#E74C3C",
              "#9B59B6",
            ]}
            legendPosition="bottom"
          />
        </div>
        <div className="flex items-center justify-center">
          <PieChart
            productCategoryData={orderStatusData}
            totalProducts={orderList?.length}
            title="Order Status"
            colorScheme={[
              "#16A085",
              "#2ECC71",
              "#3498DB",
              "#E74C3C",
              "#9B59B6",
              "#95A5A6",
            ]}
            legendPosition="bottom"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
