import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import moment from "moment";

const ProductTile = ({
  product,
  setFormData,
  setCurrentEditedId,
  setOpenCreateProductDialog,
  handleDeleteProduct,
}) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div className="">
        <div className="relative">
          <img
            className="w-full h-[300px] md:h-[250px] rounded-t-lg object-cover"
            src={product?.image}
            alt={product?.title}
          />
        </div>
        <div className="block">
          <CardContent className="py-2">
            <h2 className="text-xl uppercase mb-2 font-bold">
              {product?.title}
            </h2>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-orange-600 capitalize border inline-block p-1">
                {product?.brand}
              </p>
              <p className="text-sm text-gray-600 capitalize border-b inline-block p-1">
                {product?.category}
              </p>
            </div>
            <div className="flex items-center justify-between my-2">
              <h3
                className={`text-lg font-semibold text-primary ${
                  product.salePrice > 0 ? "line-through" : ""
                }`}
              >
                Price: ${product?.price}
              </h3>
              {product?.salePrice ? (
                <h3 className="text-sm  text-gray-500 text-primary">
                  Sale Price: ${product?.salePrice}
                </h3>
              ) : null}
            </div>
            <p className="text-gray-500 overflow-y-auto h-[60px]  text-sm">
              {product?.description}
            </p>
          </CardContent>
          <CardFooter className="flex gap-4 md:flex-col justify-between items-center">
            <div className="flex flex-col gap-2 items-start md:items-center justify-center">
              <p className="text-sm bg-slate-50 border border-black p-1 text-gray-800">
                Total stock: {product?.totalStock}
              </p>

              <p className="text-sm bg-slate-100 p-1 rounded-lg text-gray-500">
                {" "}
                {product.updatedAt > product.createdAt
                  ? `Updated: ${moment(product.updatedAt).format(
                      "MMMM Do, YYYY"
                    )}`
                  : `Created: ${moment(product.createdAt).format(
                      "MMMM Do, YYYY"
                    )}`}{" "}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => {
                  setFormData(product);
                  setCurrentEditedId(product._id);
                  setOpenCreateProductDialog(true);
                }}
                className="text-sm font-medium text-white bg-orange-600"
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleDeleteProduct(product._id)}
                className="text-sm font-medium text-orange-600 border border-orange-600"
              >
                Delete
              </Button>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default ProductTile;
