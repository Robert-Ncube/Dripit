import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import OrderDetails from "./OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUser,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/orderSlice";
import moment from "moment";
import { Badge } from "../ui/badge";

const Orders = () => {
  const [openDetails, setOpenDetails] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.ShopOrder);

  console.log("orderDetails:", orderDetails);

  const handleFetchOrderDetails = (orderId) => {
    dispatch(getOrderDetails(orderId));
  };

  useEffect(() => {
    if (orderDetails?._id) {
      setOpenDetails(true);
    } else {
      setOpenDetails(false);
    }
  }, [orderDetails]);

  useEffect(() => {
    dispatch(getAllOrdersByUser(user?.id));
  }, [dispatch]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden md:block">Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0 ? (
              orderList.map((orderItem, idx) => (
                <TableRow key={idx}>
                  <TableCell className="hidden md:block">
                    {orderItem?._id}
                  </TableCell>
                  <TableCell>
                    {moment(orderItem?.createdAt).format("MMM Do YYYY")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`p-2 ${
                        orderItem?.orderStatus === "Rejected"
                          ? "bg-red-600"
                          : orderItem?.orderStatus === "confirmed"
                          ? "bg-green-600"
                          : orderItem?.orderStatus === "processing"
                          ? "bg-yellow-600"
                          : orderItem?.orderStatus === "Delivered"
                          ? "bg-blue-600"
                          : orderItem?.orderStatus === "Pending"
                          ? "bg-slate-300 text-black"
                          : orderItem?.orderStatus === "Shipping"
                          ? "bg-purple-600"
                          : ""
                      }`}
                    >
                      {orderItem?.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{orderItem?.totalAmount}</TableCell>
                  <TableCell>
                    <Dialog
                      open={openDetails}
                      onOpenChange={() => {
                        setOpenDetails(false);
                        dispatch(resetOrderDetails());
                      }}
                    >
                      <Button
                        onClick={() => handleFetchOrderDetails(orderItem?._id)}
                        className="bg-orange-600"
                      >
                        View Details
                      </Button>
                      <OrderDetails orderDetails={orderDetails} />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No orders found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Orders;
