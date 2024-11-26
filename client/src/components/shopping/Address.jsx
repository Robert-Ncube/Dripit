import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Form from "../common/Form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  deleteAddress,
  getAddresses,
  updateAddress,
} from "@/store/shop/addressSlice";
import AddressCard from "./AddressCard";
import toast from "react-hot-toast";

const initialAddress = {
  address: "",
  city: "",
  country: "",
  zipcode: "",
  phone: "",
  email: "",
  notes: "",
};

const Address = ({ setSelectedAddress, Checkout, selectedId }) => {
  const [formData, setFormData] = useState(initialAddress);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.ShopAddress);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const handleManageAddress = (e) => {
    e.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddress);
      toast.error("You can only have a maximum of 3 addresses.");
      return;
    }

    currentEditedId
      ? dispatch(
          updateAddress({
            addressId: currentEditedId,
            userId: user?.id,
            formData,
          })
        ).then((data) => {
          if (data.payload.success) {
            dispatch(getAddresses(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddress);
          } else {
            console.log("Error updating address:", data.payload.error);
          }
        })
      : dispatch(
          addAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data.payload.success) {
            dispatch(getAddresses(user?.id));
            setFormData(initialAddress);
          } else {
            console.log("Error adding address:", data.payload.error);
          }
        });
  };

  const handleDeleteAddress = (selectedAddress) => {
    console.log("user:", user.id, "adddress:", selectedAddress._id);
    dispatch(
      deleteAddress({
        addressId: selectedAddress?._id,
        userId: user?.id,
      })
    ).then((data) => {
      if (data.payload.success) {
        dispatch(getAddresses(user?.id));
      } else {
        console.log("Error deleting address:", data.payload.error);
      }
    });
  };

  const handleEditAddress = (selectedAddress) => {
    setCurrentEditedId(selectedAddress._id);
    setFormData({
      ...formData,
      address: selectedAddress?.address,
      city: selectedAddress?.city,
      country: selectedAddress?.country,
      zipcode: selectedAddress?.zipcode,
      phone: selectedAddress?.phone,
      email: selectedAddress?.email,
      notes: selectedAddress?.notes,
    });
  };

  useEffect(() => {
    dispatch(getAddresses(user?.id));
  }, [dispatch]);

  return (
    <Card>
      <div className="mb-5 p-3 grid px-10 grid-cols-1 sm:px-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {addressList.length > 0 &&
          addressList.map((address, index) => (
            <AddressCard
              Checkout={Checkout}
              addressInfo={address}
              key={index}
              handleDeleteAddress={handleDeleteAddress}
              handleEditAddress={handleEditAddress}
              setSelectedAddress={setSelectedAddress}
              selectedId={selectedId}
            />
          ))}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Form
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleManageAddress}
          buttonText={currentEditedId ? "Save Changes" : "Add Address"}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
