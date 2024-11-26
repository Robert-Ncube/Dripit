import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { removeFromCart, updateCartItemQuantity } from "@/store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const CartContent = ({ cartItem }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.ShopCart);
  const { products } = useSelector((state) => state.ShopProducts);

  const handleCartItemDelete = (cartItem) => {
    dispatch(
      removeFromCart({ userId: user?.id, productId: cartItem?.productId })
    );
    console.log("user:", user.id, "product:", cartItem.productId);
  };

  const handleUpdateQuantity = (cartItem, typeOfAction) => {
    if (typeOfAction === "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartProduct = getCartItems.findIndex(
          (item) => item.productId === cartItem?.productId
        );

        const currentProductIndex = products.findIndex(
          (product) => product._id === cartItem?.productId
        );
        const totalStock = products[currentProductIndex].totalStock;

        if (indexOfCurrentCartProduct > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartProduct].quantity;

          if (getQuantity + 1 > totalStock) {
            toast.error("Insufficient stock!");
            return;
          }
        }
      }
    }

    dispatch(
      updateCartItemQuantity({
        userId: user?.id,
        productId: cartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? cartItem?.quantity + 1
            : cartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        console.log(
          "Updated quantity for user:",
          user.id,
          "product:",
          cartItem.productId
        );
      } else {
        console.error(
          "Failed to update quantity for user:",
          user.id,
          "product:",
          cartItem.productId
        );
      }
    });
  };

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h2 className="font-extrabold capitalize">{cartItem?.title}</h2>
        <div className="flex items-center mt-1 gap-4">
          <Button
            variant="outline"
            size="icon"
            title="decrease quantity"
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
            disabled={cartItem?.quantity === 1}
            className="h-8 w-8 p-2 rounded-full border-none"
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="text-sm font-medium">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            title="increase quantity"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
            className="h-8 w-8 p-2 rounded-full border-none"
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-end">
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          size={26}
          title="remove product"
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1 hover:text-orange-600"
        />
      </div>
    </div>
  );
};

export default CartContent;
