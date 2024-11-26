import React, { useState } from "react";
import banner from "@/assets/banner-3.jpg";
import Address from "@/components/shopping/Address";
import { useDispatch, useSelector } from "react-redux";
import CartContent from "@/components/shopping/CartContent";
import { MdAddShoppingCart } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/store/shop/orderSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LuLoader2 } from "react-icons/lu";

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.ShopCart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { approvalURL, isLoading } = useSelector((state) => state.ShopOrder);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentStart, setPaymentStart] = useState(false);

  const calculateTotalIndividualItems = (items) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const totalCartAmount =
    cartItems && Array.isArray(cartItems.items) && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (total, item) =>
            total +
            (item.salePrice > 0 ? item.salePrice : item.price) * item.quantity,
          0
        )
      : 0;

  // console.log("cart:", cartItems);
  // console.log("address:", selectedAddress);

  const handeInitiatePaypalPayment = () => {
    if (selectedAddress === null) {
      toast.error("Please select an address to proceed!");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems?.items.map((cartItem) => ({
        productId: cartItem?.productId,
        title: cartItem?.title,
        image: cartItem?.image,
        price: cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price,
        quantity: cartItem?.quantity,
      })),
      addressInfo: {
        addressId: selectedAddress?._id,
        address: selectedAddress?.address,
        city: selectedAddress?.city,
        country: selectedAddress?.country,
        zipcode: selectedAddress?.zipcode,
        email: selectedAddress?.email,
        phone: selectedAddress?.phone,
        notes: selectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      paymentId: "",
      payerId: "",
    };

    dispatch(createOrder(orderData)).then((data) => {
      if (data.payload.success) {
        setPaymentStart(true);
      } else {
        setPaymentStart(false);
      }
    });
  };

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={banner}
          alt="banner"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <Address
          selectedId={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          Checkout={true}
        />
        <div className="flex flex-col gap-4">
          <div className="border-b p-4 mb-6 w-full">
            <h2 className="font-bold text-2xl">Your Cart</h2>
          </div>
          {cartItems && cartItems.items && cartItems.items.length > 0 ? (
            cartItems.items.map((item, idx) => (
              <CartContent key={idx} cartItem={item} />
            ))
          ) : (
            <div className="flex items-center justify-center flex-col gap-4 shadow shadow-black p-2 px-4 rounded-lg">
              <h1 className="text-3xl md:text-4xl lg:text-5xl mt-12 text-gray-800 font-bold">
                Your cart is empty!
              </h1>
              <MdAddShoppingCart size={80} className="text-orange-600/40" />
            </div>
          )}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Grouped Items:</span>
              <span>
                {cartItems && cartItems.items ? cartItems.items.length : 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Individual Items:</span>
              <span>
                {cartItems && cartItems.items
                  ? calculateTotalIndividualItems(cartItems.items)
                  : 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Total Amount:</span>
              <span>${totalCartAmount.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex mt-5 w-full">
            <Button
              title="proceed to payments"
              className="px-4 py-2 w-full bg-orange-600 text-white rounded-md"
              onClick={handeInitiatePaypalPayment}
            >
              {isLoading ? (
                <LuLoader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Checkout With Paypal"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
