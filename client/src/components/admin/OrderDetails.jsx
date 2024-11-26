import React, { useState } from "react";
import { DialogContent, DialogTitle } from "../ui/dialog";
import Form from "../common/Form";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  getOrderDetails,
  updateOrderStatus,
} from "@/store/admin/orderSlice";

const formControls = [
  {
    label: "Order Status",
    name: "status",
    componentType: "select",
    options: [
      { id: "Pending", label: "Pending" },
      { id: "processing", label: "Processing" },
      { id: "Shipping", label: "Shipping" },
      { id: "Delivered", label: "Delivered" },
      { id: "Rejected", label: "Rejected" },
    ],
  },
];

const initialFormData = {
  status: "",
};

const OrderDetails = ({ orderDetails }) => {
  const [formData, setFormData] = useState(initialFormData);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleUpdateOrderStatus = (e) => {
    e.preventDefault();
    console.log(formData);
    const { status } = formData;

    dispatch(
      updateOrderStatus({ orderId: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload.success) {
        dispatch(getOrderDetails(orderDetails?._id));
        setFormData(initialFormData);
      }
    });
  };

  return (
    <DialogContent className="sm:max-w-[600px] overflow-auto h-[600px]">
      <DialogTitle className="sr-only">Order Details</DialogTitle>
      <div className="grid gap-6 mt-8">
        <div className="grid gap-4 mt-4">
          <div className="flex items-center justify-between">
            <p className="font-medium">Order ID</p>
            <p className="text-gray-600">{orderDetails?._id}</p>
          </div>
          <hr />
          <div className="flex items-center justify-between">
            <p className="font-medium">Payer ID</p>
            <p className="text-gray-600">{orderDetails?.payerId}</p>
          </div>
          <hr />
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Date</p>
            <p className="text-gray-600">
              {moment(orderDetails?.createdAt).format("MMMM Do YYYY")}
            </p>
          </div>
          <hr />
          <div className="flex items-center justify-between">
            <p className="font-medium">Status</p>
            <p
              className={` border p-2 rounded-lg bg-slate-100 ${
                orderDetails?.orderStatus === "Rejected"
                  ? "text-red-600"
                  : orderDetails?.orderStatus === "confirmed"
                  ? "text-green-600"
                  : orderDetails?.orderStatus === "processing"
                  ? "text-yellow-600"
                  : orderDetails?.orderStatus === "Delivered"
                  ? "text-blue-600"
                  : orderDetails?.orderStatus === "Pending"
                  ? "text-slate-300"
                  : orderDetails?.orderStatus === "Shipping"
                  ? "text-purple-600"
                  : "text-gray-600"
              }`}
            >
              {orderDetails?.orderStatus}
            </p>
          </div>
          <hr />
          <div className="flex items-center justify-between">
            <p className="font-medium">Total Price</p>
            <p className="text-gray-600">${orderDetails?.totalAmount}</p>
          </div>
          <hr />
          <div className="flex items-center justify-between">
            <p className="font-medium">Payment Method</p>
            <p className="text-gray-600">{orderDetails?.paymentMethod}</p>
          </div>
          <hr />
          <div className="flex items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <p className="text-gray-600">{orderDetails?.paymentStatus}</p>
          </div>
          <hr />
        </div>

        <div className="grid gap-4 bg-slate-100 p-4 rounded-lg h-full">
          <div className="grid gap-2">
            <h2 className="font-bold">Products</h2>
            <ul className="grid gap-3">
              {orderDetails?.cartItems &&
                orderDetails?.cartItems.length > 0 &&
                orderDetails?.cartItems.map((product, index) => (
                  <li
                    key={index}
                    className="bg-slate-400 rounded-lg p-2 flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <p>{product.title}</p>
                      <p>${product.price}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p>Quantity: {product.quantity}</p>
                      <p>Total: ${product.price * product.quantity}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <hr />
        <div className="grid gap-2 shadow-sm shadow-black p-4">
          <div className="font-bold w-full text-center p-2 border-b text-xl">
            Shipping info
          </div>
          <div className="grid gap-0.5 text-muted-foreground">
            <div className="flex items-center justify-between">
              <p>Customer Name: </p>
              <p className="text-black capitalize font-semibold">
                {user?.username}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p>Address: </p>
              <p className="text-black font-semibold">
                {orderDetails?.addressInfo.address}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p>City: </p>
              <p className="text-black font-semibold">
                {orderDetails?.addressInfo.city}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p>Country: </p>
              <p className="text-black font-semibold">
                {orderDetails?.addressInfo.country}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p>Zipcode: </p>
              <p className="text-black font-semibold">
                {orderDetails?.addressInfo.zipcode}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p>Email: </p>
              <p className="text-black font-semibold">
                {orderDetails?.addressInfo.email}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p>Phone: </p>
              <p className="text-black font-semibold">
                {orderDetails?.addressInfo.phone}
              </p>
            </div>
            <hr />
            <div className="flex flex-col items-center justify-between g-1">
              <p className="text-black font-semibold underline">Notes: </p>
              <p>{orderDetails?.addressInfo.notes}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <Form
          formControls={formControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Update Order Status"}
          onSubmit={handleUpdateOrderStatus}
        />
      </div>
    </DialogContent>
  );
};

export default OrderDetails;
