import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const ProductTile = ({ product, handleGetProductDetails, handleAddToCart }) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />

          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out of Stock!
            </Badge>
          ) : product?.totalStock <= 10 ? (
            <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">
              {`Only ${product?.totalStock} left!`}
            </Badge>
          ) : (
            product?.salePrice > 0 && (
              <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
                Sale
              </Badge>
            )
          )}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold">{product?.title}</h2>

          <div className="flex items-center justify-between py-2">
            <p className="text-sm text-orange-600 p-1 font-bold border border-orange-600 capitalize">
              {product?.brand}
            </p>
            <p className="text-sm text-gray-600 border-b">
              {product?.category}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-sm text-black ${
                product?.salePrice ? "line-through text-gray-500" : "font-bold"
              }`}
            >
              Price: ${product?.price}
            </p>
            {product?.salePrice ? (
              <p
                className={`text-sm text-black ${
                  product?.salePrice ? "font-bold" : ""
                }`}
              >
                Sale Price: ${product?.salePrice}
              </p>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          {product?.totalStock === 0 ? (
            <Button
              onClick={() => handleAddToCart(product._id)}
              className="text-sm font-medium bg-orange-600 opacity-60 cursor-not-allowed"
              disabled
            >
              Out of Stock!
            </Button>
          ) : (
            <Button
              onClick={() => handleAddToCart(product._id, product?.totalStock)}
              className="text-sm font-medium bg-orange-600"
            >
              Add to Cart
            </Button>
          )}

          <Button
            variant="ghost"
            onClick={() => handleGetProductDetails(product._id)}
            className="text-sm font-medium text-orange-600 border border-orange-600"
          >
            More Details
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ProductTile;
