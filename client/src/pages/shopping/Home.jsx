import React, { useEffect, useState } from "react";
import Collection from "@/assets/fashion.png";

import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  BabyIcon,
  CloudLightning,
  ShirtIcon,
  UmbrellaIcon,
  WatchIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllShopProducts,
  getShopProductById,
} from "@/store/shop/productSlice";
import ProductTile from "@/components/shopping/ProductTile";

import Adidas from "@/assets/logos/adidas.png";
import Puma from "@/assets/logos/puma.png";
import Nike from "@/assets/logos/nike.png";
import Burberry from "@/assets/logos/burberry.jpg";
import CK from "@/assets/logos/calvin-klein.png";
import Gucci from "@/assets/logos/gucci.png";
import Guess from "@/assets/logos/guesss.png";
import Levis from "@/assets/logos/levis.png";
import LV from "@/assets/logos/louis-Vuitton.jpg";
import Prada from "@/assets/logos/prada.jpg";
import Versace from "@/assets/logos/versace.png";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/cartSlice";
import toast from "react-hot-toast";
import ProductDetailsDialogue from "@/components/shopping/ProductDetailsDialogue";
import { getFeatureImages } from "@/store/common/featureSlice";

const categoriesWithIcons = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandWithIcons = [
  { id: "adidas", label: "Adidas", logo: Adidas },
  { id: "puma", label: "Puma", logo: Puma },
  { id: "nike", label: "Nike", logo: Nike },
  { id: "burberry", label: "Burberry", logo: Burberry },
  { id: "calvin-klein", label: "Calvin Klein", logo: CK },
  { id: "gucci", label: "Gucci", logo: Gucci },
  { id: "guess", label: "Guess", logo: Guess },
  { id: "levis", label: "Levi's", logo: Levis },
  { id: "louis-vuitton", label: "Louis Vuitton", logo: LV },
  { id: "prada", label: "Prada", logo: Prada },
  { id: "versace", label: "Versace", logo: Versace },
];

const Home = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const { featureImagesList } = useSelector((state) => state.CommonFeatures);

  const [openProductDetailsDialogue, setOpenProductDetailsDialogue] =
    useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, productDetails } = useSelector(
    (state) => state.ShopProducts
  );
  const { user } = useSelector((state) => state.auth);

  const handleNavToListing = (categoryItem, section) => {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [categoryItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    navigate(`/shop/listing`);
  };

  const handleGetProductDetails = (currentProductId) => {
    console.log(currentProductId);

    dispatch(getShopProductById(currentProductId));
  };

  const handleAddToCart = (selectedProductId) => {
    console.log("product", selectedProductId, "user:", user.id);
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
    dispatch(getFeatureImages());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % featureImagesList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featureImagesList]);

  useEffect(() => {
    dispatch(
      getAllShopProducts({ filterParams: {}, sortParams: "price-lowtohigh" })
    );
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null) {
      setOpenProductDetailsDialogue(true);
    }
  }, [productDetails]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative w-full h-[100vh] overflow-hidden">
        {featureImagesList &&
          featureImagesList.length > 0 &&
          featureImagesList.map((slide, index) => (
            <img
              src={slide?.image}
              alt="slide"
              key={index}
              className={` ${
                index === currentSlideIndex ? "opacity-100" : "opacity-0"
              } absolute top-0 left-0 w-full h-[100%] object-cover transition-opacity duration-1000`}
            />
          ))}
        <Button
          variant="outline"
          size="icon"
          title="previous slide"
          onClick={() =>
            setCurrentSlideIndex(
              (prev) =>
                (prev - 1 + featureImagesList.length) % featureImagesList.length
            )
          }
          className="absolute text-white hover:text-white hover:bg-slate-700 top-1/2 left-4 transform -translate-y-1/2 bg-black"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          title="next slide"
          onClick={() =>
            setCurrentSlideIndex(
              (prev) => (prev + 1) % featureImagesList.length
            )
          }
          className="absolute text-white hover:text-white hover:bg-slate-700 top-1/2 right-4 transform -translate-y-1/2 bg-black"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by Cartegory
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcons.map((category, index) => (
              <Card
                key={index}
                title={category.label}
                onClick={() => handleNavToListing(category, "category")}
                className="flex flex-col items-center justify-center px-4 py-6 bg-white rounded-md shadow-md shadow-black cursor-pointer hover:shadow-xl"
              >
                <category.icon className="w-12 h-12 text-gray-400 " />
                <h3 className="text-sm font-semibold text-gray-800">
                  {category.label}
                </h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandWithIcons.map((brand, index) => (
              <Card
                key={index}
                title={brand.label}
                onClick={() => handleNavToListing(brand, "brand")}
                className="flex flex-col gap-2 items-center justify-center px-4 py-6 bg-white rounded-md shadow-md shadow-black cursor-pointer hover:shadow-xl"
              >
                <img
                  src={brand.logo}
                  alt={brand.label}
                  className="w-16 h-16 object-cover rounded-md bg-transparent"
                />
                <h3 className="text-sm font-semibold text-gray-800">
                  {brand.label}
                </h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#FBAB7E] w-full">
        <img
          src={Collection}
          alt="collection"
          className={`w-full h-[100%] object-cover`}
        />
      </section>

      <section className="py-12 bg-byneweb-gradient">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Trending Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.slice(0, 4).map((product, index) => (
              <ProductTile
                key={index}
                product={product}
                handleGetProductDetails={handleGetProductDetails}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>
      <ProductDetailsDialogue
        open={openProductDetailsDialogue}
        setOpen={setOpenProductDetailsDialogue}
        productDetails={productDetails}
      />
    </div>
  );
};

export default Home;
