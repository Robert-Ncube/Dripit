import ProductDetailsDialogue from "@/components/shopping/ProductDetailsDialogue";
import ProductTile from "@/components/shopping/ProductTile";
import { Button } from "@/components/ui/button";
import { addToCart, fetchCartItems } from "@/store/cartSlice";
import { getShopProductById } from "@/store/shop/productSlice";
import { clearSearchResults, searchProduct } from "@/store/shop/searchSlice";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [openProductDetailsDialogue, setOpenProductDetailsDialogue] =
    useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchResults } = useSelector((state) => state.ShopSearch);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.ShopCart);
  const { productDetails } = useSelector((state) => state.ShopProducts);
  const dispatch = useDispatch();

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

  const handleGetProductDetails = (currentProductId) => {
    dispatch(getShopProductById(currentProductId));
  };

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 2) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(searchProduct(keyword));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(clearSearchResults());
    }
  }, [keyword]);

  useEffect(() => {
    if (productDetails !== null) {
      setOpenProductDetailsDialogue(true);
    }
  }, [productDetails]);

  console.log("searchResult:", searchResults);

  return (
    <div className="bg-white w-full">
      <div className="min-h-screen container mx-auto md:px-6 px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="w-full flex items-center">
            <input
              title="search"
              className="w-full px-4 py-3 rounded-md text-gray-700 bg-white border border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              type="text"
              value={keyword}
              name="keyword"
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search by name, category or brand..."
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {searchResults && searchResults.length ? (
            searchResults.map((product, idx) => (
              <ProductTile
                key={idx}
                product={product}
                handleAddToCart={handleAddToCart}
                handleGetProductDetails={handleGetProductDetails}
              />
            ))
          ) : (
            <p className="text-center text-5xl text-gray-500">
              No products found.
            </p>
          )}
        </div>
      </div>
      <ProductDetailsDialogue
        open={openProductDetailsDialogue}
        setOpen={setOpenProductDetailsDialogue}
        productDetails={productDetails}
      />
    </div>
  );
};

export default Search;
