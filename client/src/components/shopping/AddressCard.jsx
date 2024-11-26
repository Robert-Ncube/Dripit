import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

const AddressCard = ({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setSelectedAddress,
  Checkout,
  selectedId,
}) => {
  return (
    <Card
      className={`mb-6 shadow-sm shadow-black bg-slate-100 ${
        Checkout ? "cursor-pointer " : ""
      } ${
        selectedId?._id === addressInfo?._id ? "border-2 border-orange-600" : ""
      }`}
      onClick={() => setSelectedAddress(addressInfo)}
    >
      <CardContent
        className={`flex flex-col items-center justify-center h-full p-4 `}
      >
        <span className="bg-white rounded-full p-2 border border-slate-400 my-4 h-8 w-1/2 text-center"></span>
        <div className="grid gap-4 pt-8 border-red-600 w-full">
          <label>Address: {addressInfo?.address}</label>
          <label>City: {addressInfo?.city}</label>
          <label>Country: {addressInfo?.country}</label>
          <label>Zip Code: {addressInfo?.zipcode}</label>
          <label>Phone: {addressInfo?.phone}</label>
          <label>Email: {addressInfo?.email}</label>
          <label>Notes: {addressInfo?.notes}</label>
        </div>
        <div className="flex items-center justify-between px-4 py-3 mt-4 border-t-2 border-slate-300 w-full gap-2">
          <Button
            className="bg-orange-600"
            onClick={() => handleEditAddress(addressInfo)}
          >
            Edit
          </Button>
          <Button
            className="border border-orange-600"
            variant="outline"
            onClick={() => handleDeleteAddress(addressInfo)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
