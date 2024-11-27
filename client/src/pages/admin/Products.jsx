import ImageUpload from "@/components/admin/ImageUpload";
import ProductTile from "@/components/admin/ProductTile";
import Form from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "@/store/admin/productsSlice";
import React, { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { LuLoader } from "react-icons/lu";

const initialFormData = {
  title: "",
  price: "",
  description: "",
  category: "",
  brand: "",
  image: null,
  salePrice: "",
  totalStock: "",
};

const Products = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList, isLoading } = useSelector(
    (state) => state.adminProducts
  );
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    currentEditedId !== null
      ? dispatch(
          updateProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          toast.success("Product updated successfully!");
          console.log("edited:", data);
          setCurrentEditedId(null);
          dispatch(getAllProducts());
          setOpenCreateProductDialog(false);
          setFormData(initialFormData);
          setUploadedImageUrl("");
          setImageFile(null);
        })
      : dispatch(
          addProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          console.log("data:", data);

          if (data?.payload.success) {
            dispatch(getAllProducts());
            setOpenCreateProductDialog(false);
            setFormData(initialFormData);
            setUploadedImageUrl("");
            setImageFile(null);
            toast.success("Product added successfully!");
          }
        });
  };

  const handleDeleteProduct = (CurrentProductId) => {
    dispatch(deleteProduct(CurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        toast.success("Product deleted successfully!");
        dispatch(getAllProducts());
      }
    });
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 flex border-b pb-2 border-gray-400 w-full justify-between">
        <h2 className="text-4xl font-bold">Products</h2>
        <Button
          title="create new product"
          onClick={() => setOpenCreateProductDialog(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded-md"
        >
          Add Product
        </Button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center gap-4 justify-center text-center w-full h-full">
          <LuLoader size={40} className="animate-spin" />
          <h2 className="text-xl text-gray-800">Loading...</h2>
        </div>
      ) : productList.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {productList.map((productItem, idx) => (
            <ProductTile
              key={idx}
              product={productItem}
              setCurrentEditedId={setCurrentEditedId}
              setOpenCreateProductDialog={setOpenCreateProductDialog}
              setFormData={setFormData}
              handleDeleteProduct={handleDeleteProduct}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-tracking-tighter py-12 flex items-center justify-center flex-col">
          <MdOutlineProductionQuantityLimits
            className="text-gray-400"
            size={80}
          />
          <h2 className="text-4xl py-5 font-semibold">No products found!</h2>
          <p className="text-sm py-4 text-gray-500">
            Add products and start selling!
          </p>
          <Button
            title="create new product"
            onClick={() => setOpenCreateProductDialog(true)}
            className="bg-orange-600 text-white px-4 py-2 rounded-md"
          >
            Create a Product
          </Button>
        </div>
      )}

      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
          setUploadedImageUrl("");
          setImageFile(null);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle className="uppercase font-bold underline">
              {currentEditedId ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageUploadLoading={imageUploadLoading}
            setImageUploadLoading={setImageUploadLoading}
            isInEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <Form
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId ? "Save Changes" : "Add Product"}
              onSubmit={handleSubmit}
              imageUploadLoading={imageUploadLoading}
              isBtnDisabled={!uploadedImageUrl}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default Products;
