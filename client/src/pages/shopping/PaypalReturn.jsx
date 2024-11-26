import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/orderSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const PaypalReturn = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("CurrentOrderId"));

      dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("CurrentOrderId");
          window.location.href = "/shop/payment-success";
        } else {
          console.error("Failed to capture payment");
        }
      });
    }
  }, [paymentId, payerId]);

  return (
    <Card className="min-h-screen rounded-none">
      <CardHeader>
        <CardTitle>Processing your Payment...</CardTitle>
        <hr />
      </CardHeader>
      <CardContent>
        <p>Thank you for your payment. Your order is being processed.</p>
      </CardContent>
    </Card>
  );
};

export default PaypalReturn;
