import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import CartContent from "./CartContent";
import { useNavigate } from "react-router-dom";

const CartWrapper = ({ cartItems, setOpenCart }) => {
  const navigate = useNavigate();

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

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle className="font bold text-3xl">Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4 h-[60%] overflow-auto">
        {cartItems && Array.isArray(cartItems.items)
          ? cartItems.items.map((item, idx) => (
              <CartContent cartItem={item} key={idx} />
            ))
          : null}
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
              {cartItems && Array.isArray(cartItems.items)
                ? calculateTotalIndividualItems(cartItems.items)
                : 0}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">Total Amount:</span>
            <span>${totalCartAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCart(false);
        }}
        className="w-full mt-6 bg-orange-600"
      >
        Checkout
      </Button>
    </SheetContent>
  );
};

export default CartWrapper;
