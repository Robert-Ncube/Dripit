import Filter from "@/components/shopping/Filter";
import ProductDetailsDialogue from "@/components/shopping/ProductDetailsDialogue";
import ProductTile from "@/components/shopping/ProductTile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import {
  getAllShopProducts,
  getShopProductById,
} from "@/store/shop/productSlice";
import { ArrowUpDownIcon } from "lucide-react";
import { addToCart, fetchCartItems } from "@/store/cartSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const createSearchParamsHelper = (filterParams) => {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join("&");
};

const Listing = () => {
  const dispatch = useDispatch();
  const { products, productDetails } = useSelector(
    (state) => state.ShopProducts
  );
  const { user } = useSelector((state) => state.auth);

  // Initialize filters and sort states
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { cartItems } = useSelector((state) => state.ShopCart);
  const [openProductDetailsDialogue, setOpenProductDetailsDialogue] =
    useState(false);

  const categorySearchParam = searchParams.get("category");

  // Handle sorting selection
  const handleSort = (value) => {
    setSort(value);
  };

  // Handle filter changes
  const handleFilter = (getSectionId, getCurrentOption) => {
    let copyFilters = { ...filters };
    const indexOfCurrentSection =
      Object.keys(copyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      // Initialize as an array if it doesn't exist
      copyFilters[getSectionId] = [getCurrentOption];
    } else {
      // Ensure it's an array before pushing
      if (!Array.isArray(copyFilters[getSectionId])) {
        copyFilters[getSectionId] = [];
      }

      const indexOfCurrentOption =
        copyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1) {
        copyFilters[getSectionId].push(getCurrentOption);
      } else {
        copyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }

    setFilters(copyFilters);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  };

  // Get product details by ID
  const handleGetProductDetails = (currentProductId) => {
    dispatch(getShopProductById(currentProductId));
  };

  // Add product to cart
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

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(getAllShopProducts({ filterParams: filters, sortParams: sort }));
    }
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (productDetails !== null) {
      setOpenProductDetailsDialogue(true);
    }
  }, [productDetails]);

  return (
    <div className="w-full h-screen overflow-auto rounded-lg">
      <div className="grid grid-cols-1  md:grid-cols-[300px_1fr] gap-6 mx-4 h-[1050px] md:h-[88%] overflow-auto rounded-lg mt-2">
        <Filter filters={filters} handleFilter={handleFilter} />
        <div className="bg-background w-full rounded-lg shadow-sm">
          <div className="p-4 border border-b rounded-lg flex items-center justify-between">
            <h2 className="text-lg font-extrabold">All Products</h2>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground mr-2 bg-slate-200 py-1 px-2 rounded-lg">
                {products.length} Products
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 hover:border-orange-600"
                  >
                    <ArrowUpDownIcon size={30} />
                    <span className="text-sm font-medium">Sort by</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuRadioGroup
                    value={sort}
                    onValueChange={handleSort}
                  >
                    {sortOptions.map((sortItem) => (
                      <DropdownMenuRadioItem
                        className="cursor-pointer"
                        key={sortItem.id}
                        value={sortItem.id}
                      >
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4 mb-4">
            {products.length > 0 ? (
              products.map((productItem, idx) => (
                <ProductTile
                  key={idx}
                  product={productItem}
                  handleGetProductDetails={handleGetProductDetails}
                  handleAddToCart={handleAddToCart}
                />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-inherit gap-4 mt-4">
        <Button variant="primary" size="lg">
          Load More
        </Button>
        <Button variant="ghost" size="lg">
          Clear Filters
        </Button>
      </div>
      <ProductDetailsDialogue
        open={openProductDetailsDialogue}
        setOpen={setOpenProductDetailsDialogue}
        productDetails={productDetails}
      />
    </div>
  );
};

export default Listing;
