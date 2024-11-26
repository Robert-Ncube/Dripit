import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ArrowDown, StarIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/cartSlice";
import toast from "react-hot-toast";
import { setProductDetails } from "@/store/shop/productSlice";
import StarRating from "../common/StarRating";
import { addReview, getReviews } from "@/store/shop/reviewSlice";
import RatingStars from "@/components/common/RatingStars";

const ProductDetailsDialogue = ({ open, setOpen, productDetails }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.ShopCart);
  const { reviews } = useSelector((state) => state.ProductReviews);

  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);

  const handleAddToCart = (selectedProductId, totalStock) => {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentProduct = getCartItems.findIndex(
        (item) => item.productId === selectedProductId
      );

      if (indexOfCurrentProduct > -1) {
        const getQuantity = getCartItems[indexOfCurrentProduct].quantity;

        if (getQuantity + 1 > totalStock) {
          toast.error("Insufficient stock!");
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: selectedProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Product added to cart!");
        dispatch(fetchCartItems(user?.id));
      }
    });
  };

  const handleDialogueClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
  };

  const handleRatingChange = (getRating) => {
    setRating(getRating);
    console.log("getRating:", getRating);
  };

  const handleSubmitReview = () => {
    dispatch(
      addReview({
        userId: user?.id,
        productId: productDetails?._id,
        username: user?.username,
        message: message,
        ratingValue: rating,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Review submitted!");
        setMessage("");
        setRating(0);
        dispatch(getReviews(productDetails?._id));
      } else {
        console.log("Error submitting review:", data.payload.error);
      }
    });
  };

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(getReviews(productDetails?._id));
    }
  }, [productDetails]);

  const avarageRatingValue = reviews.length
    ? reviews.reduce((acc, review) => acc + review.ratingValue, 0) /
      reviews.length
    : 0;

  //console.log("reviews", reviews);

  return (
    <Dialog open={open} onOpenChange={handleDialogueClose}>
      <DialogContent className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:p-5 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] h-[600px] md:h-auto overflow-auto">
        <div className="relative overflow-hidden rounded-lg h-[300px] md:h-auto">
          <img
            className="object-cover aspect-square w-full h-full "
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
          />
          {productDetails?.salePrice > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              On-Sale
            </Badge>
          )}
        </div>
        <div className="flex flex-col gap-3 lg:gap-3 md:overflow-auto">
          <div className="flex flex-col md:gap-5">
            <h1 className="text-2xl md:text-3xl font-bold">
              {productDetails?.title}
            </h1>
            <div className="flex items-center justify-between py-2">
              <p className="text-sm text-orange-600 capitalize border border-orange-600 p-1 font-bold inline-flex">
                {productDetails?.brand}
              </p>
              <p className="text-sm text-gray-600 capitalize border-b p-1 font-bold inline-flex">
                {productDetails?.category}
              </p>
            </div>
            <p className="text-sm text-gray-600">
              {productDetails?.description}
            </p>
            <div className="flex items-center justify-start gap-4 ">
              <div className="flex py-2 items-center gap-0.5 mt-2">
                <RatingStars rating={avarageRatingValue} />
              </div>
              <span className="text-muted-foreground">
                ({avarageRatingValue.toFixed(2)})
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-sm md:text-xl ${
                productDetails?.salePrice
                  ? "line-through  text-gray-600"
                  : "font-bold text-black"
              }`}
            >
              Price: ${productDetails?.price}
            </p>
            {productDetails?.salePrice ? (
              <p
                className={`text-sm md:text-xl text-black ${
                  productDetails?.salePrice ? "font-bold" : ""
                }`}
              >
                Sale Price: ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center justify-between">
            {productDetails?.totalStock === 0 ? (
              <Button
                onClick={() => handleAddToCart(productDetails._id)}
                className="text-sm font-medium bg-orange-600 opacity-60 cursor-not-allowed"
                disabled
              >
                Out of Stock!
              </Button>
            ) : (
              <Button
                className="text-sm font-medium bg-orange-600"
                onClick={() =>
                  handleAddToCart(
                    productDetails._id,
                    productDetails?.totalStock
                  )
                }
              >
                Add to Cart
              </Button>
            )}
            <ArrowDown className="md:hidden" />
          </div>
          <hr className="bg-slate-600" />
          <div className="max-h-[300px] h-full overflow-auto">
            <div className="border-b flex flex-col mb-4">
              <h2 className="text-xl font-bold mb-2 ">Reviews</h2>
              <h3 className="text-sm text-gray-700">Rate this product</h3>
            </div>
            <div className="flex">
              <StarRating
                rating={rating}
                handleRatingChange={handleRatingChange}
              />
            </div>
            <div className="my-6 flex">
              <input
                type="text"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border-b border-black"
                placeholder="Leave a review..."
              />
              <Button
                onClick={handleSubmitReview}
                disabled={message.trim() === ""}
                className="text-sm text-white bg-primary hover:bg-primary-dark rounded-none hover:bg-white hover:text-orange-600"
                size="small"
                title="submit a review"
              >
                Submit
              </Button>
            </div>
            <hr />
            <div className="flex flex-col gap-4">
              {reviews && reviews.length > 0 ? (
                reviews.map((review, idx) => (
                  <div key={idx} className="flex border-b py-2 gap-4">
                    <Avatar className="w-10 h-10 border border-slate-600">
                      <AvatarFallback>
                        {review?.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold capitalize">
                          {review?.username}
                        </h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <RatingStars rating={review?.ratingValue} />
                      </div>
                      <p className="text-sm text-gray-600">{review?.message}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600">
                  No reviews yet. Be the first to leave a review!
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialogue;
