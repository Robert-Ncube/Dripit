import { Button } from "@/components/ui/button";
import React from "react";
import BG from "@/assets/payment-success.jpg";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-orange-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <img src={BG} alt="Payment Successful" className="mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-orange-600 mb-4">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Thank you for your purchase. Your payment was processed successfully.
        </p>
        <div className="flex space-x-4">
          <Button
            variant="ghost"
            onClick={() => (window.location.href = "/shop/home")}
            className="px-4 py-2 border border-orange-500 hover:text-white rounded-lg hover:bg-orange-600"
          >
            Home
          </Button>
          <Button
            variant="ghost"
            onClick={() => (window.location.href = "/shop/account")}
            className="px-4 py-2 border border-orange-500 hover:text-white rounded-lg hover:bg-orange-600"
          >
            See Details
          </Button>
          <Button
            onClick={() => (window.location.href = "/shop/listing")}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Continue Buying
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
